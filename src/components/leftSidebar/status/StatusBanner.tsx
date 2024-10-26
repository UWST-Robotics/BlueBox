import {Box} from "@mui/material";
import {Circle} from '@mui/icons-material';

export default function StatusBanner() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Circle
                sx={{
                    color: '#44bb44',
                    fontSize: 10,
                    marginRight: 1
                }}
            />
            <p>
                <b>Status:</b> Connected
            </p>
        </Box>
    )
}