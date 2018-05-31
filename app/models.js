// @flow

export type Token = string;

export type User = {|
  id?: number,
  firstName: string,
  lastName: string,
  department: ?string,
  connectedAccounts?: Array<string>
|};

export type Talk = {|
  id: number,
  title: string,
  description: string,
  speakers: Array<User>
|};

export type Timeslot = {|
  id: number,
  startTime: string,
  endTime: string,
  talks: Array<number>,
  type:
    | 'SINGLE_TALK'
    | 'MULTIPLE_TALKS'
    | 'KEYNOTE'
    | 'LUNCH'
    | 'BREAK'
    | 'OPENING'
    | 'SUMMARY'
|};

export type Event = {|
  id: number,
  name: string,
  description: string,
  date: string,
  isPublic: boolean,
  isPublished: boolean,
  eventType: 'CONFERENCE' | 'MEETUP' | 'HACKATHON',
  speakers: Array<User>,
  timeslots: Array<Timeslot>,
  talks: Array<Talk>
|};

const DEPARTMENTS = {
  CICERO: 'Cicero',
  GROUP_FUNCTIONS: 'Group functions',
  MANAGED_SERVICES: 'Managed services',
  MANAGEMENT: 'Management',
  SALG: 'Salg',
  TCC_PM_TM: 'TCC PM & TM',
  TCC_TECHNOLOGY: 'TCC Technology',
  TCC_DIGITAL_BUSINESS_EXPERIENCE: 'TCC Digital business and experience'
};

export function getDepartment(departmentKey: ?$Keys<typeof DEPARTMENTS>) {
  if (departmentKey && DEPARTMENTS[departmentKey]) {
    return DEPARTMENTS[departmentKey];
  }

  return 'Unknown';
}
