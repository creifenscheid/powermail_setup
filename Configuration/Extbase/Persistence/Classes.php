<?php

return [
    \In2code\Powermail\Domain\Model\Field::class => [
        'subclasses' => [
            0 => \CReifenscheid\PowermailSetup\Domain\Model\Field::class
        ]
    ],
    \In2code\Powermail\Domain\Model\Page::class => [
        'subclasses' => [
            0 => \CReifenscheid\PowermailSetup\Domain\Model\Page::class
        ]
    ],
    \In2code\Powermail\Domain\Model\Form::class => [
        'subclasses' => [
            0 => \CReifenscheid\PowermailSetup\Domain\Model\Form::class
        ]
    ],

    \CReifenscheid\PowermailSetup\Domain\Model\Field::class => [
        'tableName' => 'tx_powermail_domain_model_field'
    ],
    \CReifenscheid\PowermailSetup\Domain\Model\Page::class => [
        'tableName' => 'tx_powermail_domain_model_page'
    ],
    \CReifenscheid\PowermailSetup\Domain\Model\Form::class => [
        'tableName' => 'tx_powermail_domain_model_form'
    ]
];
