import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import {useEffect} from "react";
import db from "../utils/Firebase";

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const [mostRecentRating, setMostRecentRating] = React.useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const ratingsRef = collection(db, "ratings");
            const q = query(ratingsRef, orderBy("timestamp", "desc"), limit(1));
            const querySnapshot = await getDocs(q);
            let mostRecentRating;
            querySnapshot.forEach((doc) => {
                mostRecentRating = doc.data();
            });

            setMostRecentRating(mostRecentRating);
        };

        fetchData();
    }, []);

    return (
        <React.Fragment>
            <Title>Recent Rating</Title>
            <Typography component="p" variant="h4">
                {mostRecentRating ? mostRecentRating.rating : "No ratings yet"}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {mostRecentRating ? mostRecentRating.timestamp.toDate().toLocaleString() : "No ratings yet"}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 2 }}>
                by {mostRecentRating ? mostRecentRating.playerId : "No ratings yet"}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View all ratings
                </Link>
            </div>
        </React.Fragment>
    );
}