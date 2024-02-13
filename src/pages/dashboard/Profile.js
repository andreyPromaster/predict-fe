// material-ui
import { Breadcrumbs, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| COMPONENTS - TYPOGRAPHY ||============================== //

const Profile = (props) => {
    const {ticker, profile} = props;
    return (
    <MainCard title={profile.companyName} contentSX={{ pt: 0 }}>
        <Typography variant="body1" paragraph>
            {profile.description}
        </Typography>

    </MainCard>
)};

export default Profile;