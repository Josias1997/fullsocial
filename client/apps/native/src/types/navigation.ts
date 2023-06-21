import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";

export interface StackScreenProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
}
