import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';
// import { MatChip } from '@angular/material/chips';
import { MatStepper } from '@angular/material/stepper';

interface Configuration {
  id: number;
  name: string;
  descriptions: string[];
}

interface SurveyType {
  id: number;
  name: string;
  descriptions: string[];
  isHidden: boolean;
  allowedConfigurationIdList: number[];
}

interface Survey {
  type: SurveyType;
  isComplete: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Survey Builder Flow Mockup';
  @ViewChild('surveyStepper') surveyStepper: MatStepper;
  @ViewChild('step1') step1: MatStepper;
  @ViewChild('surveyTypeTooltip') surveyTypeTooltip: MatTooltip;
  // @ViewChild('surveyTypeChip') surveyTypeChip: MatChip;

  mySurvey = <Survey>{};
  surveyTypes: SurveyType[];
  configurations: Configuration[];

  prevStepIndex: number = 0;
  showTypeChangeDialog: boolean = false;
  indexExpanded: number = -1;
  isScheduledNotificationSelected: boolean;
  isRandomNotificationSelected: boolean;
  isRestrictionsSelected: boolean;
  isFollowUpSelected: boolean;

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;
  surveyTypeControl = new FormControl('', Validators.required);
  configurationControl = new FormControl([]);

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {
    this.mySurvey = {
      type: {
        id: null,
        name: null,
        descriptions: null,
        isHidden: null,
        allowedConfigurationIdList: null,
      },
      isComplete: false,
    };

    this.configurations = [
      {
        id: 1,
        name: 'scheduled Notifications',
        descriptions: [
          'This is scheduled Notifications Line 1',
          'This is scheduled Notifications Line 2',
        ],
      },
      {
        id: 2,
        name: 'Random Notifications',
        descriptions: [
          'This is Random Notifications Line 1',
          'This is Random Notifications Line 2',
        ],
      },
      {
        id: 3,
        name: 'Restrictions (Availability)',
        descriptions: [
          'This is Restrictions Line 1 (Survey Availability)',
          'This is Restrictions Line 2',
        ],
      },
      { id: 4, name: 'Follow-up', descriptions: ['This is Follow-up Line 1'] },
    ];

    this.surveyTypes = [
      {
        id: 1,
        name: 'Self-initiated survey',
        descriptions: ['All survey configuration are available.'],
        isHidden: false,
        allowedConfigurationIdList: [1, 2, 3, 4],
      },
      {
        id: 2,
        name: 'Unpublished survey',
        descriptions: [
          'A survey will be hidden from participant(s).',
          'Most survey configuration are still available except the following properties: (1) period of time and (2) number of times a survey can be taken.',
          'To make the survey visible to participants later, go to "RESTRICTIONS" section of the survey and enable visibility.',
        ],
        isHidden: true,
        allowedConfigurationIdList: [1, 2, 3, 4],
      },
      {
        id: 3,
        name: 'Follow-up survey',
        descriptions: [
          'A survey will be hidden from participants.',
          'Participants can only access the survey via the follow-up notification window when another survey launches it.',
        ],
        isHidden: true,
        allowedConfigurationIdList: null,
      },
    ];
  }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      surveyTypeControl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      configurationControl: '',
    });
    this.formGroup3 = this._formBuilder.group({
      ScheduledControl: '',
    });
    this.formGroup4 = this._formBuilder.group({
      RandomControl: '',
    });
    this.formGroup5 = this._formBuilder.group({
      RestrictionsControl: '',
    });
    this.formGroup6 = this._formBuilder.group({
      FollowUpControl: '',
    });
  }

  onSelectChangeSurveyType(index): void {
    console.log('showTypeChangeDialog: ' + this.showTypeChangeDialog);

    if (index == null) {
      console.log('None clicked');
      this.mySurvey.type.id = null;
      this.mySurvey.type.name = null;
      this.mySurvey.type.descriptions = null;
      this.mySurvey.type.isHidden = null;
      this.mySurvey.type.allowedConfigurationIdList = null;
      this.mySurvey.isComplete = null;
      console.log(this.mySurvey);
    } else {
      if (this.showTypeChangeDialog) {
        this.resetSurvey();
        this.showTypeChangeDialog = false; // reset showTypeChangeDialog to => false
      }
      this.mySurvey.type.id = this.surveyTypes[index].id;
      this.mySurvey.type.name = this.surveyTypes[index].name;
      this.mySurvey.type.descriptions = this.surveyTypes[index].descriptions;
      this.mySurvey.type.isHidden = this.surveyTypes[index].isHidden;
      this.mySurvey.type.allowedConfigurationIdList = this.surveyTypes[
        index
      ].allowedConfigurationIdList;
      this.mySurvey.isComplete = true;
      console.log(this.mySurvey.type.name);
    }
  }

  onResetClicked(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.resetSurvey();
        this.surveyStepper.reset();
      }
    });
  }

  resetSurvey(): void {
    console.log('Reset survey');

    this.surveyTypeControl.reset();
    this.configurationControl.reset();
    this.configurationControl.patchValue([]);

    this.mySurvey.type.id = null;
    this.mySurvey.type.name = null;
    this.mySurvey.type.descriptions = null;
    this.mySurvey.type.isHidden = null;
    this.mySurvey.type.allowedConfigurationIdList = null;
    this.mySurvey.isComplete = null;

    this.isScheduledNotificationSelected = false;
    this.isRandomNotificationSelected = false;
    this.isRestrictionsSelected = false;
    this.isFollowUpSelected = false;
  }

  onConfigRemoved(config: Configuration) {
    console.log(this.configurationControl);
    const configs = this.configurationControl.value as Configuration[];
    this.removeFirst(configs, config);
    this.configurationControl.setValue(configs); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  onClickStepper() {
    // Show reset tooltip in the chip
    if (this.surveyStepper.selectedIndex == 1 && this.prevStepIndex == 0) {
      if (this.surveyTypeTooltip) {
        this.surveyTypeTooltip.show(600);
      }
    }

    // Show survey type change dialog
    if (this.showTypeChangeDialog == false && this.prevStepIndex == 0) {
      this.showTypeChangeDialog = false;
    }
    if (this.prevStepIndex != 0) {
      this.showTypeChangeDialog = true;
    }

    // Set the previous step index to current before returning
    this.prevStepIndex = this.surveyStepper.selectedIndex;

    console.log('showTypeChangeDialog: ' + this.showTypeChangeDialog);
    console.log('prevStepIndex: ' + this.prevStepIndex);
  }

  onSelectionChangeConfiguration(event) {
    console.log(event.isUserInput, event.source.value, event.source.selected);
    let index: number;

    if (event.isUserInput) {
      if (event.source.selected) {
        index = event.source.value.id;
      }
      this.indexExpanded = index;
    }
    // console.log('config id (end)= ' + index);
    // console.log('indexExpanded (end)= ' + this.indexExpanded);

    /* Show/hide configuration steps */
    let isSelected: boolean = event.source.selected;

    switch (event.source.value.id) {
      case 1:
        this.isScheduledNotificationSelected = isSelected;
        break;
      case 2:
        this.isRandomNotificationSelected = isSelected;
        break;
      case 3:
        this.isRestrictionsSelected = isSelected;
        break;
      case 4:
        this.isFollowUpSelected = isSelected;
        break;
      default:
        break;
    }
  }
}
