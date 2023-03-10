<?php

namespace CReifenscheid\PowermailSetup\Domain\Model;

use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/***************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2023 Christian Reifenscheid
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 * Class Page
 *
 * @package CReifenscheid\PowermailSetup\Domain\Model
 */
class Page extends \In2code\Powermail\Domain\Model\Page
{
    /**
     * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\CReifenscheid\PowermailSetup\Domain\Model\Field>|null
     */
    protected $fields;

    /**
     * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\CReifenscheid\PowermailSetup\Domain\Model\Field>
     */
    public function getFields() : ObjectStorage
    {
        return $this->fields;
    }

    /**
     * @param \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\CReifenscheid\PowermailSetup\Domain\Model\Field> $fields
     *
     * @return void
     */
    public function setFields(ObjectStorage $fields) : void
    {
        $this->fields = $fields;
    }
}
