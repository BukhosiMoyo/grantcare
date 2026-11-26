"use client";

import { Children, isValidElement, useEffect, useId, useRef, useState, type SelectHTMLAttributes, type ReactNode } from "react";
import { Check, ChevronDown } from "@/components/lucide-icons";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string; disabled: boolean };
function optionText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(optionText).join("");
  if (isValidElement<{children?: ReactNode}>(node)) return optionText(node.props.children);
  return "";
}

/** Styled listbox with a native form control for FormData, reset and validation. */
export function StyledSelect({ children, className, value, defaultValue, onChange, disabled, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const native = useRef<HTMLSelectElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [internal, setInternal] = useState(String(defaultValue ?? ""));
  const [active, setActive] = useState(0);
  const search = useRef({text:"",time:0});
  const options: Option[] = Children.toArray(children).flatMap(child => {
    if (!isValidElement<{value?: string | number; children?: ReactNode; disabled?: boolean; label?: string}>(child) || child.type !== "option") return [];
    return [{value:String(child.props.value ?? optionText(child.props.children)),label:child.props.label ?? optionText(child.props.children),disabled:!!child.props.disabled}];
  });
  const selectedValue = value !== undefined ? String(value) : internal || options[0]?.value || "";
  const selectedIndex = Math.max(0, options.findIndex(option => option.value === selectedValue));
  const selected = options[selectedIndex];

  useEffect(() => {
    function outside(event: PointerEvent) { if (!root.current?.contains(event.target as Node)) setOpen(false); }
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  useEffect(() => {
    const form = native.current?.form;
    function reset() { requestAnimationFrame(() => {setInternal(native.current?.value ?? "");setInvalid(false);setOpen(false);}); }
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, []);
  useEffect(() => {
    if (open) list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({block:"nearest"});
  }, [active, open]);

  function choose(index: number) {
    const option = options[index];
    if (!option || option.disabled || !native.current) return;
    native.current.value = option.value;
    native.current.dispatchEvent(new Event("change", {bubbles:true}));
    setOpen(false); setInvalid(false); trigger.current?.focus();
  }
  function move(direction: number) {
    let next = open ? active : selectedIndex;
    for (let step=0;step<options.length;step++) {
      next=(next+direction+options.length)%options.length;
      if (!options[next].disabled) break;
    }
    setActive(next);setOpen(true);
  }
  // Preserve native multi-select behavior where a listbox is requested.
  if (props.multiple || (props.size ?? 0) > 1) return <select {...props} disabled={disabled} value={value} defaultValue={defaultValue} onChange={onChange} className={cn("styled-native-select",className)}>{children}</select>;

  return (
    <div ref={root} className="relative min-w-0" data-styled-select>
      <select {...props} id={props.id ? `${props.id}-native` : undefined} ref={native} disabled={disabled} value={value} defaultValue={value === undefined ? defaultValue : undefined} tabIndex={-1} aria-hidden="true" className="sr-only" onChange={event => {setInternal(event.currentTarget.value);setInvalid(false);onChange?.(event);}} onInvalid={event => {event.preventDefault();setInvalid(true);setValidationMessage(event.currentTarget.validationMessage || "Please choose an option.");setOpen(true);trigger.current?.focus();}}>{children}</select>
      <button ref={trigger} id={props.id} type="button" role="combobox" aria-label={props["aria-label"]} aria-labelledby={props["aria-labelledby"]} aria-expanded={open} aria-haspopup="listbox" aria-controls={`${id}-list`} aria-activedescendant={open ? `${id}-option-${active}` : undefined} aria-describedby={[props["aria-describedby"],invalid ? `${id}-error` : ""].filter(Boolean).join(" ") || undefined} aria-invalid={invalid || props["aria-invalid"]} aria-required={props.required} disabled={disabled || options.length === 0}
        className={cn("focus-ring flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-border bg-surface py-3 pl-4 pr-4 text-left text-base text-foreground shadow-sm transition-colors hover:border-primary/40 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50", open && "border-primary ring-2 ring-primary/10", invalid && "border-danger",className)}
        onClick={() => {setActive(selectedIndex);setOpen(!open);}}
        onKeyDown={event => {
          if(event.key==="ArrowDown" || event.key==="ArrowUp") {event.preventDefault();move(event.key==="ArrowDown"?1:-1);}
          else if(event.key==="Home" || event.key==="End") {event.preventDefault();const candidates=options.map((option,index)=>!option.disabled?index:-1).filter(index=>index>=0);setActive(event.key==="Home"?candidates[0]:candidates.at(-1)??0);setOpen(true);}
          else if(event.key==="Enter" || event.key===" ") {event.preventDefault();if(open)choose(active);else {setActive(selectedIndex);setOpen(true);}}
          else if(event.key==="Escape") {event.preventDefault();setOpen(false);}
          else if(event.key==="Tab")setOpen(false);
          else if(event.key.length===1 && !event.ctrlKey && !event.metaKey && !event.altKey) {event.preventDefault();const now=Date.now();search.current={text:(now-search.current.time<700?search.current.text:"")+event.key.toLocaleLowerCase(),time:now};const index=options.findIndex(option=>!option.disabled&&option.label.toLocaleLowerCase().startsWith(search.current.text));if(index>=0){setActive(index);setOpen(true);}}
        }}>
        <span className="min-w-0 truncate">{selected?.label ?? ""}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-primary transition-transform",open&&"rotate-180")} />
      </button>
      {open ? <div ref={list} id={`${id}-list`} role="listbox" aria-label={props["aria-label"]} className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-64 overflow-y-auto rounded-xl border border-border bg-surface p-1.5 shadow-xl">
        {options.map((option,index)=><div id={`${id}-option-${index}`} key={`${option.value}-${index}`} role="option" aria-selected={option.value===selectedValue} aria-disabled={option.disabled} data-index={index} onPointerMove={()=>!option.disabled&&setActive(index)} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(index)} className={cn("flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-base",index===active&&"bg-surface-strong text-primary",option.value===selectedValue&&"font-semibold text-primary",option.disabled&&"cursor-not-allowed opacity-40")}><span>{option.label}</span>{option.value===selectedValue?<Check className="h-4 w-4 shrink-0" />:null}</div>)}
      </div> : null}
      {invalid ? <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger">{validationMessage}</p> : null}
    </div>
  );
}
