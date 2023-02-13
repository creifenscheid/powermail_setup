<?php

defined('TYPO3') || die();

$extensionKey = 'powermail_setup';

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($extensionKey, 'Configuration/TypoScript', \TYPO3\CMS\Core\Utility\GeneralUtility::underscoredToUpperCamelCase($extensionKey) . ' :: MainTemplate');
