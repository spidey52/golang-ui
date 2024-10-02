import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

type TableDataProps = {
 isLoading: boolean;
 rows: unknown[];
 columns: GridColDef[];
 limit: number;
 setLimit: (limit: number) => void;
 page: number;
 total: number | undefined;
 setPage: (page: number) => void;
 setSelectedId?: (id: string) => void;
};

const TableData = ({ isLoading, rows, total, columns, limit, setLimit, setPage, setSelectedId }: TableDataProps) => {
 return (
  <DataGrid
   sx={{
    height: "80vh",
   }}
   pageSizeOptions={[10, 20, 30, 50, 100]}
   initialState={{
    pagination: {
     paginationModel: {
      pageSize: limit,
     },
    },
   }}
   isRowSelectable={() => false}
   onRowClick={(params) => {
    if (!setSelectedId) return;
    setSelectedId(params.row.id as string);
   }}
   loading={isLoading}
   pagination={true}
   paginationMode='server'
   rowCount={total}
   onPaginationModelChange={(params) => {
    console.log(params);
    if (params.pageSize) {
     setLimit(params.pageSize);
    }

    if (params.page !== undefined) {
     setPage(params.page);
    }
   }}
   rows={rows as GridValidRowModel[]}
   columns={columns}
  />
 );
};

export default TableData;
