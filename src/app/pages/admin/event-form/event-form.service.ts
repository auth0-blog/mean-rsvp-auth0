import { Injectable } from '@angular/core';

@Injectable()
export class EventFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: '',
    location: '',
    viewPublic: '',
    description: '',
    datesGroup: {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    }
  };
  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  locMax = 200;
  dateMax = 10;
  timeMax = 8;
  descMax = 2000;
  // Formats
  dateFormat = 'm/d/yyyy';
  timeFormat = 'h:mm AM/PM';

  constructor() {
    this.validationMessages = {
      title: {
        required: `Title is <strong>required</strong>.`,
        minlength: `Title must be ${this.textMin} characters or more.`,
        maxlength: `Title must be ${this.titleMax} characters or less.`
      },
      location: {
        required: `Location is <strong>required</strong>.`,
        minlength: `Location must be ${this.textMin} characters or more.`,
        maxlength: `Location must be ${this.locMax} characters or less.`
      },
      startDate: {
        required: `Start date is <strong>required</strong>.`,
        maxlength: `Start date cannot be longer than ${this.dateMax} characters.`,
        pattern: `Start date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `Start date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
      startTime: {
        required: `Start time is <strong>required</strong>.`,
        pattern: `Start time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `Start time must be ${this.timeMax} characters or less.`
      },
      endDate: {
        required: `End date is <strong>required</strong>.`,
        maxlength: `End date cannot be longer than ${this.dateMax} characters.`,
        pattern: `End date must be in the format <strong>${this.dateFormat}</strong>.`,
        date: `End date must be a <strong>valid date</strong> at least one day <strong>in the future</strong>.`
      },
      endTime: {
        required: `End time is <strong>required</strong>.`,
        pattern: `End time must be a <strong>valid time</strong> in the format <strong>${this.timeFormat}</strong>.`,
        maxlength: `End time must be ${this.timeMax} characters or less.`
      },
      viewPublic: {
        required: `You must specify whether this event should be publicly listed.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      }
    };
  }

}
