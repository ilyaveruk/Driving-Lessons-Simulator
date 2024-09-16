import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const RankDetails = ({ rank, onClose }) => {
    if (!rank) return null;

    return (
        <Dialog open={Boolean(rank)} onClose={onClose}>
            <DialogTitle>Rank Details</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Player Name: {rank.playerId}</Typography>
                <Typography variant="body1">Role: {rank.role === 0 ? "Driver" : rank.role === 1 ? "Instructor" : "No role has set"}</Typography>
                <Typography variant="body1">Level Name: {rank.levelName}</Typography>
                <Typography variant="body1">Rating: {rank.rating}</Typography>
                <Typography variant="body1">Description: {rank.description}</Typography>
                <Typography variant="body1">Time Created: {rank.timestamp}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default RankDetails;