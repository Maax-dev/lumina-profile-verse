
import { Grid2X2, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface GridControlsProps {
  onGridChange: (columns: number, rows: number) => void;
}

export function GridControls({ onGridChange }: GridControlsProps) {
  const [columns, setColumns] = useState(4);
  const [rows, setRows] = useState(4);

  const handleColumnChange = (value: number[]) => {
    setColumns(value[0]);
    onGridChange(value[0], rows);
  };

  const handleRowChange = (value: number[]) => {
    setRows(value[0]);
    onGridChange(columns, value[0]);
  };

  return (
    <div className="space-y-4 mb-6 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium min-w-[100px]">Columns: {columns}</span>
        <Slider
          defaultValue={[4]}
          max={6}
          min={1}
          step={1}
          onValueChange={handleColumnChange}
          className="w-[200px]"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium min-w-[100px]">Rows: {rows}</span>
        <Slider
          defaultValue={[4]}
          max={6}
          min={1}
          step={1}
          onValueChange={handleRowChange}
          className="w-[200px]"
        />
      </div>

      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => {
                setColumns(2);
                setRows(2);
                onGridChange(2, 2);
              }}>
                <Grid2X2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>2x2 Grid</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => {
                setColumns(3);
                setRows(3);
                onGridChange(3, 3);
              }}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>3x3 Grid</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={() => {
                setColumns(4);
                setRows(4);
                onGridChange(4, 4);
              }}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>4x4 Grid</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
