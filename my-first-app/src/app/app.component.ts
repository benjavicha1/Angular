import { Component, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

interface SurveyType {
  id: number;
  name: string;
  descriptions: string[];
  isHidden: boolean;
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
})
export class AppComponent {
  title = 'Survey Builder Flow Mockup';
  // Survey Types
  selectedSurveyType: string;
  selectedSurveyType_Id: number;
  selectedSurveyType_Name: string;
  selectedSurveyType_DescriptionList: string[];
  selectedSurveyType_IsHidden: boolean;
  allowedConfigTypeList: number[] = [1, 2];
  showDone: boolean = false;

  surveyTypes: SurveyType[] = [
    {
      id: 1,
      name: 'Self-initiated survey',
      descriptions: ['All survey configuration are available.'],
      isHidden: false,
    },
    {
      id: 2,
      name: 'Unpublished survey',
      descriptions: [
        'A survey will be hidden from participant(s).',
        'Most survey configuration are still available except the follow properties: period of time and number of times a survey can be taken.',
        'To make the survey visible to participants later, go to "RESTRICTIONS" section of the survey and enable visibility.',
      ],
      isHidden: true,
    },
    {
      id: 3,
      name: 'Follow-up survey',
      descriptions: [
        'A survey will be hidden from participants.',
        'Participants can only access the survey via the follow-up notification window when another survey launches it.',
      ],
      isHidden: true,
    },
  ];

  changeClientSurveyType(data): void {
    console.log(data);
    if (data == null) {
      console.log('here1');
      this.selectedSurveyType_Id = null;
      this.selectedSurveyType_Name = null;
      this.selectedSurveyType_DescriptionList = null;
      this.selectedSurveyType_IsHidden = null;
      this.showDone = false;
    } else {
      console.log('here2');
      this.selectedSurveyType_Id = this.surveyTypes[data].id;
      this.selectedSurveyType_Name = this.surveyTypes[data].name;
      this.selectedSurveyType_DescriptionList = this.surveyTypes[
        data
      ].descriptions;
      this.selectedSurveyType_IsHidden = this.surveyTypes[data].isHidden;
      this.showDone = true;
    }
  }

  @ViewChild('surveyStepper') surveyStepper;

  onCancelClickSurveyTypeChip(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        this.changeClientSurveyType(null);
        this.surveyStepper.reset();
      }
    });
  }

  // Configuration options
  Configurations = new FormControl();

  configurationList: string[] = [
    'scheduled Notifications',
    'Random Notifications',
    'Restrictions (Survey Availability)',
    'Follow-up',
  ];

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  surveyTypeControl = new FormControl('', Validators.required);
  isOptional = false;

  constructor(private _formBuilder: FormBuilder, private dialog: MatDialog) {}

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      surveyTypeControl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: '',
    });
  }
}
