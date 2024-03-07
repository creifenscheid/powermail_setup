<?php

defined('TYPO3') || die();

$extensionKey = 'powermail_setup';
$table = 'tx_powermail_domain_model_field';
$l10n = 'LLL:EXT:' . $extensionKey . '/Resources/Private/Language/locallang_' . $table . '.xlf:';

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns(
    'tx_powermail_domain_model_field',
    [
        'hide_label' => [
            'exclude' => 1,
            'label' => $l10n . 'hide_label',
            'config' => [
                'type' => 'check',
                'default' => false,
            ],
        ],
        'autocomplete' => [
            'label' => $l10n . 'autocomplete',
            'description' => $l10n . 'autocomplete.description',
            'config' => [
                'type' => 'select',
                'renderType' => 'selectSingle',
                'items' => [
                    ['label' => '', 'value' => ''],
                ],
            ],
        ],
    ]
);

/**
 * AUTOCOMPLETE CONFIGURATION
 *
 * @see https://www.w3.org/TR/WCAG21/#input-purposes for all possible values
 */
$groupPrefix = 'autocomplete_';
$groupLabelPrefix = $l10n . 'autocomplete.group.';
$itemLabelPrefix = $l10n . 'autocomplete.item.';
$autocompleteConfiguration = [
    'personal' => ['name', 'honorific-prefix', 'sex', 'given-name', 'additional-name', 'family-name', 'honorific-suffix', 'bday'],
    'address' => ['street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level2', 'postal-code', 'address-level1', 'country-name'],
    'contact' => ['tel', 'tel-national', 'email'],
    'job' => ['organization-title', 'organization'],
    'user' => ['username', 'current-password', 'new-password'],
];

foreach ($autocompleteConfiguration as $group => $items) {
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItemGroup('tx_powermail_domain_model_field', 'autocomplete', $groupPrefix . $group, $groupLabelPrefix . $group);

    foreach ($items as $item) {
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem('tx_powermail_domain_model_field', 'autocomplete', [$itemLabelPrefix . $item, $item, '', $groupPrefix . $group]);
    }
}

// PALETTES
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette('tx_powermail_domain_model_field', 'title_settings', 'title,hide_label');

// ADD TO TCA
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('tx_powermail_domain_model_field', 'autocomplete', 'input,textarea,select', 'before:description');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addToAllTCAtypes('tx_powermail_domain_model_field', '--palette--;;title_settings', '', 'replace:title');

// ADJUSTMENTS OF FIELD:TYPE:TEXT
$GLOBALS['TCA']['tx_powermail_domain_model_field']['columns']['text']['config']['enableRichtext'] = true;
