import {ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';


/**
 * @author Rezo Kobaidze
 * @version 1.0.0
 */
export class TestingHelpers {
  public fixture;

  constructor(testbed, component) {
    this.fixture = TestBed.createComponent(component);
  }

  getFixture() {
    return this.fixture;
  }

  /**
   * Returns debugElement by elements id
   *
   * @param id - The id of element
   * @return debugElement
   */
  getDebugElement(id): DebugElement {
    const debugElement = this.getFixture().debugElement.query(By.css(`#${id}`));
    return debugElement;
  }

  /**
   * Trigers event by eventName.Also runs change detection
   *
   * @param debugElement - The debugElement of element
   * @param eventName{string} - The event name (for example 'click')
   */
  trigerEvent(debugElement, eventName) {
    debugElement.triggerEventHandler(eventName, {target: debugElement.nativeElement});
    this.fixture.detectChanges();
  }


  /**
   * sets input text on input element and fires input event
   *
   * @param{DebugElement} debugElement - The debugElement of element
   * @param inputText - The input text that input element will have
   */
  fillInput(debugElement: DebugElement, inputText) {
    if (inputText) {
      debugElement.nativeElement.value = inputText;
    }
    this.trigerEvent(debugElement, 'input');
  }


  /**
   * sets form formData and fires input events
   *
   *  @param{DebugElement} debugElement - The debugElement of element
   * @param{{}} formData - The object of formData.keys must be the same as formControll names.
   */
  fillForm(debugElement: DebugElement, formData) {
    debugElement.children.forEach(childDebugElemen => {
      if (childDebugElemen.attributes.formControlName) {
        let formValue = formData[childDebugElemen.attributes.formControlName];
        this.fillInput(childDebugElemen, formValue);
      }
    });
  }


  /**
   * 1)check if form is invalid when submiting it without seting data
   * 2)check if form is Valid after seting mandatory input values.
   *
   * @param{DebugElement} debugElement - THe debugElement of element
   * @param{} formData - The form data {key,value}
   */
  testForm(debugElement: DebugElement, formData) {
    this.trigerEvent(debugElement, 'submit');
    console.log('submited form->>>', debugElement);
    expect(debugElement.componentInstance.form.status).toBe('INVALID');

    this.fillForm(debugElement, formData);
    console.log('submited form->>>', debugElement);
    expect(debugElement.componentInstance.form.status).toBe('VALID');

  }


  /**
   * Tests if element has expectedText
   *
   * @param debugElement -The debugElemen of element
   * @param expectedText -Text that we expect to be on element
   */
  expectText(debugElement, expectedText) {
    let textOnElement = debugElement.nativeElement.textContent;
    expect(textOnElement).toBe(expectedText);
  }

}
