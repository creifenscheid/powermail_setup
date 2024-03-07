<?php

defined('TYPO3') || die();

(static function () {
    $GLOBALS['TYPO3_CONF_VARS']['SYS']['Objects'][\In2code\Powermail\Domain\Repository\FormRepository::class] = [
        'className' => \CReifenscheid\PowermailSetup\Domain\Repository\FormRepository::class,
    ];
})();
