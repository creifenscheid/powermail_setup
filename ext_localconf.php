<?php

defined('TYPO3') || die();

(static function ($extensionKey) {

    \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Extbase\Object\Container\Container::class)->registerImplementation(\In2code\Powermail\Domain\Repository\FormRepository::class, \CReifenscheid\PowermailSetup\Domain\Repository\FormRepository::class);

})(
    'powermail_setup'
);