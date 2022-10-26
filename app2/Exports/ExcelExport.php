<?php

namespace App\Exports;


use App\Models\User;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use PhpOffice\PhpSpreadsheet\Cell\DataType;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithDrawings;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;

use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Style;
use PhpOffice\PhpSpreadsheet\Style\Color;
use Maatwebsite\Excel\Concerns\WithDefaultStyles;
use Maatwebsite\Excel\Concerns\WithBackgroundColor;

class ExcelExport  extends DefaultValueBinder  implements  WithEvents, FromCollection, WithHeadings, WithDefaultStyles,ShouldAutoSize,WithCustomValueBinder,WithStyles

{

    public function __construct($data,$header)
    {
       
        $this->data = $data;
        $this->header =  $header;
    
    }


    public function bindValue(Cell $cell, $value)
    {
        if (is_numeric($value)) {
            $cell->setValueExplicit($value, DataType::TYPE_NUMERIC);

            return true;
        }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->data ;
        //return uSER::all();
    }

    public function headings(): array
    {
        return $this->header;
    }
  


    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],

            // Styling a specific cell by coordinate.
          //  'B2' => ['font' => ['italic' => true]],

            // Styling an entire column.
           /// 'C'  => ['font' => ['size' => 16]],
        ];

    }
    
   /* public function startCell()
    {
        return 'A2';
    }*/
    public function registerEvents(): array
{
    return [
       /* AfterSheet::class    => function(AfterSheet $event) {
   
            $event->sheet->getDelegate()->getRowDimension('1')->setRowHeight(40);
            $event->sheet->getDelegate()->getColumnDimension('A')->setWidth(50);
 
        },*/
        AfterSheet::class    => function(AfterSheet $event) {
            $columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
            foreach ($columns as $column) {
                $event->sheet->getColumnDimension($column)->setAutoSize(true);
            }

        }
    ];
}
    public function defaultStyles(Style $defaultStyle)
    {
       // return $defaultStyle->getFill()->setFillType(Fill::FILL_SOLID);
    }

  /*  public function drawings()
  /  {
        $drawings = [];

        foreach($this->header as $k=>$drawing_temp)
        {
            if($drawing_temp)
            {
               // if($img_file = StoreImageUrlTmp($drawing_temp.'-h100'))
                {
                    $drawing = new Drawing();
                    $drawing->setName('image');
                    $drawing->setDescription('image');
                    $drawing->setPath(public_path('images/1.jpg'));
                    $drawing->setHeight(70);
                    $drawing->setOffsetX(5);
                    $drawing->setOffsetY(5);
                    $drawing->setCoordinates('A'.($k+2));
                    $drawings[] = $drawing;
                }
            }
        }
        return $drawings;
    }*/
    
}

