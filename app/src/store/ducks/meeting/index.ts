import { MeetingModel } from './types';

export const meetingsModelToState = (
  data: { [key: number]: MeetingModel },
  item: MeetingModel
) => {
  return {
    ...data,
    [item.id]: {
      id: item.id,
      subject: item.subject,
      start: item.start,
      end: item.end,
      notes: item.notes,
      employees: item.employees,
      client: item.client,
      author: item.author,
    }
  }
}
