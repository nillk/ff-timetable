import React from 'react';
import { Eraser } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { MultiSelect } from '@/components/ui/multi-select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { getAllDistinctData } from '../../utils';

export default ({ visible, onClose, screening, state, actions }) => {
  const { setData, clear } = actions;

  return (
    <Sheet open={visible} onOpenChange={open => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            Filter
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Clear"
                    onClick={clear}>
                    <Eraser />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-3 p-4">
          {Object.keys(state).map(key => (
            <MultiSelect
              key={key}
              options={getAllDistinctData(key, screening)}
              value={state[key]}
              onChange={setData(key)}
              placeholder={key[0].toUpperCase() + key.substring(1)}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
