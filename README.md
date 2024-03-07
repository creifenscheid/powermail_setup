# TYPO3 Extension "Powermail Setup"

## Purpose
This extension is more or less an accessibility boost for EXT:powermail.
Therefor the form templating is adjusted, additional supportive fields are added etc.

## Features
- Adds the following fields to EXT:powermail model:Field
  - autocomplete: selection of autocomplete possibilities for the corresponding fields
  - hideLabel: checkbox to hide the label, by keeping the possibility of addition css
- Templating
  - improves accessibility in forms by
    - refactoring label rendering
    - adding description rendering
    - refactoring field rendering for
      - checkboxes
      - date inputs
      - regular inputs
      - passwords
      - radio buttons
      - reset buttons
      - submit buttons
      - textarea fields
- backend cleanup
  - removing fields, that I personally don't use, with a specific tsconfig setting
- Report barrier configuration
  - prefill for the following fields:
    - subject: rename powermail marker to "barrier_subject"
    - message: rename powermail marker to "barrier_message"

## Known bugs
- field: date | aria-describedby attribute gets removed after focussing out

## Client side validation
At the moment EXT:powermail client side (javascript) validation is disabled. This has to be extended as followed:
- adding an icon to the messages
- adjust field labelling setup to read the error as well
