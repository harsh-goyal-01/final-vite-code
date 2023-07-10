import React from 'react'
import {DateTimeFormat} from '@formatjs/intl-datetimeformat';
import { Styleditem, Styledlist } from './DatesStyles';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
const date = _.now();
const dateformatUS = new Intl.DateTimeFormat('en-US');
const formattedDateUS = dateformatUS.format(date);
const dateformatUK = new Intl.DateTimeFormat('en-UK');
const formattedDateUK=dateformatUK.format(date);
const dateformatSpain = new Intl.DateTimeFormat('es');
const formattedDateSpain= dateformatSpain.format(date);

const Dates = () => {
  return (
    <div>
      <Styledlist>
        <Styleditem><FormattedMessage id="US" defaultMessage="Date (in US format): "></FormattedMessage>{formattedDateUS}</Styleditem>
        <Styleditem><FormattedMessage id="UK" defaultMessage="Date (in UK format): "></FormattedMessage>{formattedDateUK}</Styleditem>
        <Styleditem><FormattedMessage id="Spanish" defaultMessage="Date (in Spanish format): "></FormattedMessage>{formattedDateSpain}</Styleditem>
      </Styledlist>
       </div>
  )
}

export default Dates;