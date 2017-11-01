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
import G from '../screen/G';

const Router = StackNavigator({

  MissionDetail: {
    screen: MissionDetail,
  },
  CheckpointDetail: {
    screen: CheckpointDetail,
  },
  CheckpointLocation: {
      screen: CheckpointLocation,
    },
    CheckpointReview: {
      screen: CheckpointReview,
    },
    Login: {
      screen: Login
    },
    SearchMission: {
      screen: SearchMission,
    },
    RecommendMission: {
      screen: RecommendMission,
    },
    CurrentMission: {
      screen: CurrentMission
    },

    SelectTeam: {
        screen: SelectTeam
    },
    Home: {
        screen: Home
    },
    
}, {
   headerMode: 'none',
   mode: 'modal', 
});
export default Router;
