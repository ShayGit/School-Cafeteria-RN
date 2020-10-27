import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from "../../selection.json";
import icon from 'assets/icomoon.ttf';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig,'file-text', icon);

export default CustomIcon;