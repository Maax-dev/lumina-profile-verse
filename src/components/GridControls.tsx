
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
        <span className="text-sm font-medium text-foreground min-w-[100px]">Columns: {columns}</span>
        <Slider
          defaultValue={[4]}
          max={5}
          min={1}
          step={1}
          onValueChange={handleColumnChange}
          className="w-[200px]"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground min-w-[100px]">Rows: {rows}</span>
        <Slider
          defaultValue={[4]}
          max={5}
          min={1}
          step={1}
          onValueChange={handleRowChange}
          className="w-[200px]"
        />
      </div>
    </div>
  );
}
