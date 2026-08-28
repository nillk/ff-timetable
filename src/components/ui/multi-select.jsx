import * as React from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function MultiSelect({ options, value, onChange, placeholder, className }) {
  const [open, setOpen] = React.useState(false);

  const toggle = option => {
    onChange(
      value.includes(option)
        ? value.filter(v => v !== option)
        : [...value, option],
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'h-auto min-h-8 w-full justify-between gap-1 py-1.5 font-normal',
            className,
          )}>
          <span className="flex flex-1 flex-wrap gap-1 overflow-hidden text-left">
            {value.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {value.map(v => (
              <Badge
                key={v}
                variant="secondary"
                onClick={e => {
                  e.stopPropagation();
                  toggle(v);
                }}>
                {v}
                <X className="ml-1 size-3" />
              </Badge>
            ))}
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[20.5rem] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => toggle(option)}>
                  <Check
                    className={cn(
                      'size-4',
                      value.includes(option) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
