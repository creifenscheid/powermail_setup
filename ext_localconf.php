<?php

defined('TYPO3') || die();

(static function ($extensionKey) {

    // XCLASSES
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\In2code\Powermail\Domain\Model\Field::class] = [
        'className' => \CReifenscheid\PowermailSetup\Domain\Model\Field::class
    ];

})(
    'powermail_setup'
);
