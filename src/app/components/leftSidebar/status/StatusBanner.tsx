import {Box} from "@mui/material";
import {Circle} from '@mui/icons-material';

export interface StatusBannerProps {
    type: string;
    text: string;
    color: "green" | "yellow" | "red";
}

const statusColorMap: Record<StatusBannerProps["color"], string> = {
    green: "#44bb44",
    yellow: "#bbbb44",
    red: "#bb4444",
}

export default function StatusBanner(props: StatusBannerProps) {
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
                    color: statusColorMap[props.color],
                    fontSize: 10,
                    marginRight: 1
                }}
            />
            <p style={{margin: 5}}>
                <b>{props.type}:</b> {props.text}
            </p>
        </Box>
    )
}