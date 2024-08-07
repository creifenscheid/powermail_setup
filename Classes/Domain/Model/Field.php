<?php

namespace CReifenscheid\PowermailSetup\Domain\Model;

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

class Field extends \In2code\Powermail\Domain\Model\Field
{
    protected bool $hideLabel = false;

    protected string $autocomplete = '';

    public function isHideLabel(): bool
    {
        return $this->hideLabel;
    }

    public function setHideLabel(bool $hideLabel): void
    {
        $this->hideLabel = $hideLabel;
    }

    public function getAutocomplete(): string
    {
        return $this->autocomplete;
    }

    public function setAutocomplete(string $autocomplete): void
    {
        $this->autocomplete = $autocomplete;
    }
}
