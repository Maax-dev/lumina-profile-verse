
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Grid2X2, Grid3X3, LayoutGrid, Rows, Columns } from "lucide-react";

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

  // Generate grid visualization
  const renderGridPreview = () => {
    const cells = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        cells.push(
          <div 
            key={`${i}-${j}`} 
            className="bg-ucla-blue/40 dark:bg-ucla-lighter-blue/40 rounded-sm"
            style={{ width: '12px', height: '12px' }}
          />
        );
      }
    }
    
    return (
      <div 
        className="grid gap-1 p-2 border border-ucla-blue/30 dark:border-ucla-lighter-blue/30 rounded-md bg-background/50"
        style={{ 
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: 'fit-content',
        }}
      >
        {cells}
      </div>
    );
  };

  return (
    <div className="space-y-4 mb-6 p-4 rounded-lg border bg-card/50 backdrop-blur-sm shadow-md flex flex-col md:flex-row items-center gap-8">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Columns className="h-5 w-5 text-ucla-blue dark:text-ucla-lighter-blue" />
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
          <Rows className="h-5 w-5 text-ucla-blue dark:text-ucla-lighter-blue" />
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
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-medium text-foreground">Preview</span>
        {renderGridPreview()}
      </div>
    </div>
  );
}
