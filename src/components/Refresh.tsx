import { Pending, Refresh as RefreshIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type RefreshProps = {
 onClick: () => void;
 isLoading: boolean;
};
const Refresh = ({ onClick, isLoading }: RefreshProps) => {
 return <IconButton onClick={onClick}>{isLoading ? <Pending /> : <RefreshIcon />}</IconButton>;
};

export default Refresh;
