import { StackNavigator } from 'react-navigation';
import CurrentMission from '../screen/CurrentMission';
import RecommendMission from '../screen/RecommendMission';
import SearchMission from '../screen/SearchMission';
import MissionDetail from '../screen/MissionDetail';
import Home from '../screen/Home';
import Login from '../screen/Login';
import SelectTeam from '../screen/SelectTeam';
import CheckpointDetail from '../screen/CheckpointDetail';
import CheckpointLocation from '../screen/CheckpointLocation';
import CheckpointReview from '../screen/CheckpointReview';
import Profile from '../screen/Profile';
import ProfileBadge from '../screen/ProfileBadge';
import ProfileRanking from '../screen/ProfileRanking';

const Router = StackNavigator({
  

  
  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },
  ProfileBadge: {
    screen: ProfileBadge
  },
  ProfileRanking: {
    screen: ProfileRanking
  },
  MissionDetail: {
    screen: MissionDetail
  },
  SearchMission: {
    screen: SearchMission
  },
  RecommendMission: {
    screen: RecommendMission
  },
  CurrentMission: {
    screen: CurrentMission
  },
  CheckpointDetail: {
    screen: CheckpointDetail
  },
  CheckpointLocation: {
    screen: CheckpointLocation
  },
  CheckpointReview: {
    screen: CheckpointReview
  },
  SelectTeam: {
    screen: SelectTeam
  },
  Home: {
    screen: Home
  }
}, {
  headerMode: 'none',
  mode: 'card',
});
export default Router;
