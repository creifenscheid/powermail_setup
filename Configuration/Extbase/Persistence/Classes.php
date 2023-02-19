<?php

declare(strict_types=1);

return [
    \In2code\Powermail\Domain\Model\Field::class => [
        'subclasses' => [
            0 => \CReifenscheid\PowermailSetup\Domain\Model\Field::class
        ]
    ],
    \CReifenscheid\PowermailSetup\Domain\Model\Field::class => [
        'mapping' => [
            'tableName' => 'tx_powermail_domain_model_field'
        ]
    ]
];
