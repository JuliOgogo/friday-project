import React, {useState} from "react";
import {useAppSelector} from "../../../app/store";
import {cardPacksTotalCount, packCount, packPage} from "../../../features/packs/packs-selector";
import {useSearchParams} from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

interface PaginationTable  {
    pageCount:number,
    totalCount: number,
    page: number
}

export function PaginationTable(props: PaginationTable) {
    const [rowPerPage, setRowPerPage] = useState<number>(0)
     const packCountState = useAppSelector(packCount)
    //const packCountState = useAppSelector(props.pageCount)
    const cardPacksTotal = useAppSelector(cardPacksTotalCount)
    const pageState = useAppSelector(packPage)

    const [searchParams, setSearchParams] = useSearchParams()

    const handleChangePage = (event: unknown, page: number) => {
        const newPage = page + 1

        searchParams.set('page', newPage.toString())
        setSearchParams(searchParams)
    }
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        searchParams.set('pageCount', event.target.value.toString())
        setSearchParams(searchParams)
    }

    return (
        <TablePagination
            count={cardPacksTotal}
            component="div"
            rowsPerPage={rowPerPage}
            page={pageState ? pageState - 1 : 0}
            rowsPerPageOptions={[4, 5, 10, 25]}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
                fontFamily: 'Montserrat',
            }}
        />

    )
}