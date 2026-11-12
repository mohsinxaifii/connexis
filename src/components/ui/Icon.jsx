import {
  Map, History, LocateFixed, Gauge, LayoutDashboard, Activity, FileChartColumn, Smartphone, Filter, Clock, ClipboardList, Warehouse,
  Store, TriangleAlert, Users, Cpu, Droplets, FileText, Siren, BatteryCharging, Banknote, Container, CalendarCheck, Droplet, Timer,
  Building2, Download, Bell, Video, ScanFace, Play, Layers, Snowflake, Hourglass, Route, Sun, Satellite, ShieldCheck, Bluetooth,
  Move3d, Lock, Waves, Power, Cctv, Server, Wrench, Car, MapPin, Fuel, Zap, Camera, Thermometer, Landmark, Truck, Recycle, RadioTower,
  CircleParking, MapPinOff, EyeOff, NotebookPen, KeyRound, Snail, Scale, Split, Flame, OctagonPause, Trash2, FileQuestionMark,
  Moon, PhoneCall, Receipt, CalendarClock, Shapes, CarFront, MessagesSquare, Coffee, ThermometerSun, ClipboardPen, DoorOpen, BatteryLow, Vibrate,
  HandCoins, PackageSearch, Ghost,
} from "lucide-react";

// Only the icons the content files name, so the bundle doesn't carry all of lucide.
const ICONS = {
  Map, History, LocateFixed, Gauge, LayoutDashboard, Activity, FileChartColumn, Smartphone, Filter, Clock, ClipboardList, Warehouse,
  Store, TriangleAlert, Users, Cpu, Droplets, FileText, Siren, BatteryCharging, Banknote, Container, CalendarCheck, Droplet, Timer,
  Building2, Download, Bell, Video, ScanFace, Play, Layers, Snowflake, Hourglass, Route, Sun, Satellite, ShieldCheck, Bluetooth,
  Move3d, Lock, Waves, Power, Cctv, Server, Wrench, Car, MapPin, Fuel, Zap, Camera, Thermometer, Landmark, Truck, Recycle, RadioTower,
  CircleParking, MapPinOff, EyeOff, NotebookPen, KeyRound, Snail, Scale, Split, Flame, OctagonPause, Trash2, FileQuestionMark,
  Moon, PhoneCall, Receipt, CalendarClock, Shapes, CarFront, MessagesSquare, Coffee, ThermometerSun, ClipboardPen, DoorOpen, BatteryLow, Vibrate,
  HandCoins, PackageSearch, Ghost,
};

export default function Icon({ name, size = 22, strokeWidth = 1.6, className }) {
  const C = ICONS[name] || Activity;
  return <C size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
