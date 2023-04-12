import { ColumnDef } from '@tanstack/react-table';

// Define the type of data that the columns will display
type Cryptocurrencies = {
  pair: string;
  lastPrice: number;
  percentChange: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
}

// Define the columns and their properties
export const columns: ColumnDef<Cryptocurrencies>[] = [
  {
    accessorKey: "pair",
    cell: (info: any) => info.getValue(),
    header: () => <span>Name</span>,
    filterFn: 'fuzzy',
    size: 120,
  },
  {
    accessorKey: 'lastPrice',
    id: 'lastPrice',
    cell: (info: any) => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
    sortingFn: 'alphanumeric',
    header: () => <span>Price</span>,
    enableGlobalFilter: false,
    size: 100
  },
  {
    accessorKey: 'percentChange',
    header: () => 'Price change',
    id: 'percentChange',
    cell: (info: any) => {
      const value = parseFloat(info.getValue());
      return <span style={value > 0 ? {color: "#14ab03"} : {color: "red"}}>{value.toFixed(2) + '%'}</span>;
    },
    sortingFn: (a: any, b: any, desc: any) => {
      const numA = parseFloat(a.getValue('percentChange'));
      const numB = parseFloat(b.getValue('percentChange'));
      if (numA < numB) {
        return desc ? -1 : 1;
      }
      if (numA > numB) {
        return desc ? 1 : -1;
      }
      return 0;
    },
    enableGlobalFilter: false,
    size: 100
  },
  {
    accessorKey: 'highPrice',
    header: () => <span>24h High</span>,
    cell: (info: any) => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
    sortingFn: 'alphanumeric',
    enableGlobalFilter: false,
    size: 150
  },
  {
    accessorKey: 'lowPrice',
    header: '24h Low',
    cell: (info: any) => {
      const value = parseFloat(info.getValue());
      return value > 1 ? value.toFixed(2) : value.toFixed(4);
    },
    sortingFn: 'alphanumeric',
    enableGlobalFilter: false,
    size: 150
  },
  {
    accessorKey: 'volume',
    header: '24h Volume',
    cell: (info: any) => {
      const value = parseFloat(info.getValue());
      return (value / 1000000).toFixed(2) + 'M';
    },
    sortingFn: 'alphanumeric',
    enableGlobalFilter: false,
    size: 150
  },
];