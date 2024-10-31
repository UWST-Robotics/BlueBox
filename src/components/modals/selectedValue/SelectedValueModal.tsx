import useSelectedPath from "../../../hooks/selectedPath/useSelectedPath.ts";
import {Box, Modal} from "@mui/material";
import useSelectPath from "../../../hooks/selectedPath/actions/useSelectPath.ts";
import SelectedValueChart from "./SelectedValueChart.tsx";

export default function SelectedValueModal() {
    const selectedPath = useSelectedPath();
    const selectPath = useSelectPath();

    return (
        <Modal
            open={selectedPath !== undefined}
            onClose={() => selectPath(undefined)}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "90vw",
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    pt: 2,
                    px: 4,
                    pb: 3
                }}
            >
                <SelectedValueChart/>
            </Box>
        </Modal>
    );
}