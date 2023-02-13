$(document).ready(function() {

    if ($('form[data-powermail-validate]').length > 0) {
        initPowerMailInputs();
    }

    if($('.powermail_select').length > 0) {
        initPowermailSelect()
    }

    if ($('.js-powermail-form-navigation').length > 0) {
        let formNavIdentifier = '.js-powermail-form-navigation-button';
        $(formNavIdentifier).each(function(){
            $(this).click(function () {
                $(formNavIdentifier + '.active').removeAttr('aria-current')
                $(formNavIdentifier + '.active').removeClass('active')

                $(this).addClass('active')
                $(this).attr('aria-current', 'step')
            })
        });
    }
});

function initPowerMailInputs() {
    let selectors = $('input.powermail_input, textarea.powermail_textarea')

    $(selectors).each(function () {
        if($(this).val() !== '') {
            $(this).addClass('has-text');
        } else {
            $(this).removeClass('has-text');
        }

        $(this).on('keyup',function() {
            if ($(this).val() !== '') {
                $(this).addClass('has-text');
            } else {
                $(this).removeClass('has-text');
            }
        });
    });
}

function initPowermailSelect() {

    // hide open listboxes on click outside
    $(document).click(function(e){
        $('.js-powermail-select-button[aria-expanded=true]').each(function(){
            if ($(this).get(0) !== e.target && $(this).has(e.target).length === 0) {
                toggleSelectListbox($(this))
                $(this).focus()
            }
        });
    })

    // if powermail is submitted with ajax
    if ($('[data-powermail-ajax="true"]').length > 0) {

        /**
         * On submitting with ajax, the div.tx-powermail container of the submitted form is going to be replaced with the ajax result
         * If the result is again the form, e.g. in case of validation errors,
         * the fresh inserted selects are not going to be initialized, because the script already run.
         * So, this particular select have to be initialized as well.
         *
         * Here joins an observer the game.
         * Using an observer gives to possibility to have an eye on changes of a container.
         * If the content changes, its callback function hits in, so methods can be called, e.g. initializing the form selects \o/.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
         */
        $('[data-powermail-ajax="true"]').each(function(){

            // extract the query selector of the powermail form
            let powermailWrap = $(this).closest('.tx-powermail')[0]

            // init observer
            let observer = new MutationObserver(function(mutations) {
                initializeSelectComponents()

                // if errors existing, move the focus to first failed form element
                let errorSelector = $('.powermail_element.powermail_field_error')
                if (errorSelector.length > 0) {
                    errorSelector.first().focus()
                }
            })

            // pass the target html node and the observer options
            observer.observe(powermailWrap, {
                childList: true
            })
        })
    }

    initializeSelectComponents()
}

function initializeSelectComponents() {

    // button initialization
    $('.js-powermail-select-button').each(function(){

        // if the select got rendered with an error existing
        if ($(this).hasClass('powermail_field_error')) {
            /**
             * to prevent js overhead (cpy rendered error message into button, removing duplicate rendered error message etc.)
             * just trigger the validation at the beginning,
             * so the button got its text update and the needed error message is shown
             */
            validateCustomSelect($(this))
        }

        $(this).click(function(){
            toggleSelectListbox($(this))
        })

        $(this).on('keydown', function(e) {
            let key = e.which

            // open listbox on key "down"
            if (key === 40) {
                e.preventDefault()
                toggleSelectListbox($(this))
            }
        })

        $(this).on('focusin', function() {
            validateCustomSelect($(this))
        })
    })

    // listbox initialization
    $('.js-powermail-select-option').each(function(){

        let listbox = '.js-powermail-select-listbox'
        let listboxOption = '.js-powermail-select-option'
        let numberOfElements = $(this).closest(listbox).find('li').length
        let currentIndex = $(this).index()

        // extract the related button
        let button = $('#' + $(this).closest(listbox).data('button'))

        // multiselect detection
        const multiselect = isMultiselect(button)

        $(this).click(function() {

            // get select field id
            let inputField = '#' + button.data('input')
            let optionLabel = $(this).text().trim()
            let optionValue = $(this).attr('data-value') // attr is used, because data guesses the type of the value and casts it that way, which lead to problems in further process
            let selectValue = $(inputField).val() // will be an array for multiselect and a single value for single select

            if (multiselect) {
                let buttonTextSegments = []

                if (button.find('.value').text() !== '') {
                    buttonTextSegments = button.find('.value').text().split(', ')
                }

                // toggle aria-selected
                let stateChange = $(this).attr('aria-selected') === 'true' ? 'false' : 'true'
                $(this).attr('aria-selected', stateChange)

                // if option is turned off
                if(stateChange === 'false') {
                    // clear optionValue if option is not selected
                    selectValue.splice(selectValue.indexOf(optionValue),1);

                    // remove option label from button text
                    for (let i = 0; i < buttonTextSegments.length; i++) {
                        if (buttonTextSegments[i] === optionLabel) {
                            buttonTextSegments.splice(i, 1)
                        }
                    }

                } else {
                    // add option label to button text
                    buttonTextSegments.push(optionLabel)
                    selectValue.push(optionValue)
                }

                // update button label
                button.find('.value').text(buttonTextSegments.join(', '))

            } else {
                // reset all previous selected options of this select
                $(this).closest(listbox).find(listboxOption + '[aria-selected=true]').each(function(){
                    $(this).attr('aria-selected', 'false')
                });

                // set this option to selected
                $(this).attr('aria-selected', 'true')

                // update button label
                button.find('.value').text(optionLabel)

                // assign option value to select
                selectValue = optionValue
            }

            // update select field
            $(inputField).val(selectValue).change()

            // close listbox
            toggleSelectListbox(button)
            button.focus()
        })

        $(this).on('mouseover', function() {
            $(this).focus()
        })

        $(this).on('keydown', function(e) {
            let key = e.which

            switch (key) {
                case 38: // up
                    e.preventDefault()
                    if (currentIndex > 0) {
                        $(this).prev().focus()
                    }
                    break

                case 40: // down
                    e.preventDefault()
                    if (currentIndex < (numberOfElements - 1)) {
                        $(this).next().focus()
                    }
                    break

                case 13: // enter
                case 32: // space
                    e.preventDefault()
                    $(this).trigger('click')
                    break

                case 27: // escape
                    toggleSelectListbox(button)
                    button.focus()
                    break

                /**
                 * if the user tabs, close everything, focus will be moved by default
                 */
                case 9: // tab
                    toggleSelectListbox(button)
                    break
            }
        })
    })

    /**
     * select initialization
     *
     * to be aware of changes through powermail validation, e.g. adding the error class,
     * the select needs to be observed.
     * So we can detect, if the select is not valid and trigger the validation of the custom select,
     * to see the corresponding error message
     */
    $('.js-powermail-select').each(function(){
        let selectElement = $(this)[0]

        // init observer
        let selectObserver = new MutationObserver(function(mutations) {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes') {
                    if ($(mutation.target).hasClass('powermail_field_error')) {
                        let customSelect = $(mutation.target).siblings('.js-powermail-select-button')
                        if (customSelect) {
                            validateCustomSelect(customSelect)
                        }
                    }
                }
            }
        })

        // pass the target html node and the observer options
        selectObserver.observe(selectElement, {
            attributes: true
        })
    })
}

/**
 * Function to toggle the select listbox incl. button state
 */
function toggleSelectListbox(button) {

    // extract related listbox
    let listbox = '#' + button.attr('aria-controls')

    // update expand state
    let stateChange = button.attr('aria-expanded') === 'true' ? 'false' : 'true'
    button.attr('aria-expanded', stateChange)

    // show/hide listbox
    $(listbox).toggleClass('show')

    // listbox opens - move focus to listbox, else focus button
    if (stateChange === 'true') {
        if ($(listbox).find('.js-powermail-select-option[aria-selected=true]').length > 0) {
            // focus the first selected option
            $(listbox).find('.js-powermail-select-option[aria-selected=true]').first().focus()
        } else {
            // focus the first option
            $(listbox).find('.js-powermail-select-option').first().focus()
        }
    } else {
        button.focus()
    }
}

/**
 * Function to validate a select based on the information embedded in the corresponding button, e.g. corresponding select field
 */
function validateCustomSelect(button) {

    let required = button.data('required')

    // only if the select is required
    if (typeof required !== 'undefined' && required !== false) {

        // get id of select field
        let inputFieldId = button.data('input')
        let inputFieldSelector = '#' + button.data('input')

        // used in case of single select - defined here to prevent GUI to cry later on due to "unresolved" variable
        let inputField = $(inputFieldSelector)

        // if the select is valid -> input(s) not empty
        if (inputField.val().length !== 0) {
            // remove classes and attributes which indicates validation state
            button.removeClass('powermail_field_error')
            button.removeAttr('aria-invalid')

            // remove aria-invalid
            inputField.removeAttr('aria-invalid')

            // remove error list from aria label
            button.find('.error').empty()

            // remove the error list
            let errorList = $(inputFieldSelector + '-errors')

            if (errorList.length > 0) {
                errorList.remove()
            }

        } else {

            // only if select is not stated as invalid so far
            let invalid = button.attr('aria-invalid')
            if (typeof invalid === 'undefined' || invalid === false || invalid === 'false') {

                // add classes and attributes to indicate validation state
                button.addClass('powermail_field_error')
                button.attr('aria-invalid', 'true')

                // set aria-invalid
                inputField.attr('aria-invalid', 'true')

                // create and add error list
                let errorMessage = button.data('powermail-required-message')

                let list = document.createElement('ul')
                list.setAttribute('id', inputFieldId + '-errors')
                list.setAttribute('class', 'powermail-errors-list filled')

                let listElement = document.createElement('li')
                let errorMessageNode = document.createTextNode(errorMessage)

                listElement.appendChild(errorMessageNode)
                list.appendChild(listElement)

                button.closest('.powermail_field').append(list)

                // add error message to button inside a sr-only span
                button.find('.error').text(errorMessage)
            }
        }
    }
}

/**
 * Detects if the select (represented by its button) is a multiselect
 */
function isMultiselect(button) {
    let multiselectAttr = button.data('multiselect');
    return typeof multiselectAttr !== 'undefined' && multiselectAttr !== false
}
