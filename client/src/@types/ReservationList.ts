interface Room {
  id: number;
  name: string;
  useBeacon: boolean;
  checkKiosk: boolean;
  useDoorLock: boolean;
  checkAccessGate: boolean;
  checkAccessGPS: boolean;
  roomGeoLocationInfo: string | null;
  branchGroup: {
    id: number;
    name: string;
  };
  floor: number;
}

interface RoomType {
  id: number;
  code: string;
  name: string;
  order: number;
}

interface Patron {
  name: string;
}

interface RoomReservationState {
  id: number;
  code: string;
  name: string;
}

export interface PatronInfo {
  name: string;
  memberNo: string;
  info?: {
    name: string;
    sId: string;
  };
}

interface RoomUseSection {
  id: number;
  code: string;
  name: string;
}

export interface ReservationData {
  success: boolean;
  code: string;
  message: string;
  data: {
    totalCount: number;
    list: ReservationInfo[];
  };
}

interface ReservationInfo {
  id: number;
  room: Room;
  roomType: RoomType;
  patron: Patron;
  isMyReservation: boolean;
  beginTime: string;
  endTime: string;
  patronCount: number;
  patrons: PatronInfo[];
  roomReservationState: RoomReservationState;
  equipments: Array<string>; // 데이터가 없어서 빈 배열로 설정
  dateCreated: string;
  isEditable: boolean;
  renewableRemainingTime: number;
  renewalLimitCount: number;
  renewalTime: number;
  availableRenewal: boolean;
  isCheckInTime: boolean;
  checkInDateTime: string;
  roomUseSection: RoomUseSection;
  isAllDayOpen: boolean;
}
