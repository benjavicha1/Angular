import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

interface SurveyType {
  name: string;
  description: string;
  isHidden: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class AppComponent {
  // Survey Types
  selectedSurveyType: string;
  selectedSurveyTypeName: string = null;
  selectedSurveyTypeDescription: string = null;
  selectedSurveyTypeIsHidden: boolean;
  showDone: boolean = false;

  surveyTypes: SurveyType[] = [
    {
      name: 'Self-initiated survey',
      description:
        'Self-initiated survey allows you to configure all the features',
      isHidden: false
    },
    {
      name: 'Follow-up survey',
      description:
        'Follow-up survey will be hidden initially and available when a survey launches the follow-up message',
      isHidden: true
    },
    {
      name: 'Unpublished survey',
      description:
        'Unpublished survey will be hidden from public until you enable it',
      isHidden: false
    }
  ];

  changeClientSurveyType(data) {
    console.log(data);
    if (data == null) {
      console.log('here1');
      this.selectedSurveyTypeName = null;
      this.selectedSurveyTypeDescription = null;
      this.selectedSurveyTypeIsHidden = null;
      this.showDone = false;
    } else {
      console.log('here2');
      this.selectedSurveyTypeName = this.surveyTypes[data].name;
      this.selectedSurveyTypeDescription = this.surveyTypes[data].description;
      this.selectedSurveyTypeIsHidden = this.surveyTypes[data].isHidden;
      this.showDone = true;
    }
  }

  // Configuration options
  Configurations = new FormControl();

  configurationList: string[] = [
    'scheduled Notifications',
    'Random Notifications',
    'Restrictions (Survey Availability)',
    'Follow-up'
  ];

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  surveyTypeControl = new FormControl('', Validators.required);
  isOptional = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      surveyTypeControl: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: ''
    });
  }
}
