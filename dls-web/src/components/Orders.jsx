import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {useEffect, useState} from "react";
import db from "../utils/Firebase";
import { collection, getDocs } from 'firebase/firestore';
import {styled} from "@mui/material/styles";

function preventDefault(event) {
    event.preventDefault();
}

const HoverTableRow = styled(TableRow)({
    '&:hover': {
        backgroundColor: "#f5f5f5",
    },
});

export default function Orders() {
    const [rows, setRows] = useState([]);
    const [limit, setLimit] = useState(10);



    useEffect(() => {
        const fetchData = async () => {
            const data = await getDocs(collection(db, "ratings"));
            let formattedData = data.docs.map(doc => {
                const docData = doc.data();
                docData.timestamp = docData.timestamp.toDate().toLocaleString(); // Convert timestamp to Date
                return {id: doc.id, ...docData};
            });
            formattedData = formattedData.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
            setRows(formattedData);
        };

        fetchData();

    }, []);


    const handleSeeMore = (event) => { // New handler for "See more orders" click
        event.preventDefault();
        setLimit(prevLimit => prevLimit + 10);
    };

    return (
        <React.Fragment>
            <Title>Recent ratings</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold'}}>player Name</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Level Name</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Num Rating</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Description</TableCell>
                        <TableCell style={{fontWeight: 'bold'}}>Time created</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(0, limit).map((row) => (
                        <HoverTableRow key={row.id}>
                            <TableCell>{row.playerId}</TableCell>
                            <TableCell>{row.levelName}</TableCell>
                            <TableCell>{row.rating}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{`${row.timestamp}`}</TableCell>
                        </HoverTableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={handleSeeMore} sx={{ mt: 3 }}>
                See more ratings
            </Link>
        </React.Fragment>
    );
}