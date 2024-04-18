import * as React from 'react';
import cx from 'classnames';
import { createSvgIcon } from '../utils/createSvgIcon';
import { iconClassNames } from '../utils/iconClassNames';

export const EmojiSadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg role="presentation" focusable="false" viewBox="2 2 16 16" className={classes.svg}>
      <path
        className={cx(iconClassNames.outline, classes.outlinePart)}
        d="M7.5 9.5C8.05228 9.5 8.5 9.05228 8.5 8.5C8.5 7.94772 8.05228 7.5 7.5 7.5C6.94772 7.5 6.5 7.94772 6.5 8.5C6.5 9.05228 6.94772 9.5 7.5 9.5ZM13.5 8.5C13.5 9.05228 13.0523 9.5 12.5 9.5C11.9477 9.5 11.5 9.05228 11.5 8.5C11.5 7.94772 11.9477 7.5 12.5 7.5C13.0523 7.5 13.5 7.94772 13.5 8.5ZM13.5624 13.3904C13.3477 13.5621 13.035 13.5283 12.862 13.3153L12.8591 13.312C12.8552 13.3075 12.8476 13.2988 12.8362 13.2865C12.8134 13.2619 12.7755 13.2231 12.7222 13.1746C12.6155 13.0776 12.4477 12.9426 12.2153 12.8059C11.7535 12.5341 11.0282 12.25 10.0019 12.25C8.97555 12.25 8.24918 12.5342 7.78622 12.8061C7.55332 12.9429 7.38494 13.078 7.27783 13.1751C7.22431 13.2236 7.18628 13.2625 7.16335 13.2871C7.15188 13.2994 7.14422 13.3081 7.14031 13.3126L7.13743 13.316C6.96401 13.5287 6.65118 13.5619 6.43687 13.3898C6.22158 13.2169 6.18723 12.9022 6.36016 12.6869L6.74998 13C6.36016 12.6869 6.35998 12.6871 6.36016 12.6869L6.36088 12.686L6.36169 12.685L6.36361 12.6826L6.36861 12.6766L6.3833 12.6592C6.39519 12.6455 6.4113 12.6273 6.43168 12.6054C6.47243 12.5617 6.5304 12.5029 6.60614 12.4343C6.75752 12.297 6.98064 12.1195 7.27973 11.9439C7.88076 11.5908 8.78034 11.25 10.0019 11.25C11.2235 11.25 12.1222 11.5908 12.7225 11.9441C13.0212 12.1198 13.2439 12.2974 13.3949 12.4347C13.4705 12.5034 13.5284 12.5623 13.569 12.606C13.5893 12.6279 13.6054 12.6461 13.6173 12.6599L13.6319 12.6773L13.6369 12.6833L13.6389 12.6857L13.6397 12.6867C13.6398 12.6869 13.6404 12.6876 13.25 13L13.6404 12.6876C13.8129 12.9032 13.778 13.2179 13.5624 13.3904ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
      />
      <path
        className={cx(iconClassNames.filled, classes.filledPart)}
        d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM7.5 9.5C8.05228 9.5 8.5 9.05228 8.5 8.5C8.5 7.94772 8.05228 7.5 7.5 7.5C6.94772 7.5 6.5 7.94772 6.5 8.5C6.5 9.05228 6.94772 9.5 7.5 9.5ZM13.5 8.5C13.5 7.94772 13.0523 7.5 12.5 7.5C11.9477 7.5 11.5 7.94772 11.5 8.5C11.5 9.05228 11.9477 9.5 12.5 9.5C13.0523 9.5 13.5 9.05228 13.5 8.5ZM13.5624 13.3904C13.9375 13.0391 13.6288 12.6737 13.6173 12.6599C13.6054 12.6461 13.5893 12.6279 13.569 12.606C13.5284 12.5623 13.4705 12.5034 13.3949 12.4347C13.2439 12.2974 13.0212 12.1198 12.7225 11.9441C12.1222 11.5908 11.2235 11.25 10.0019 11.25C8.78034 11.25 7.88076 11.5908 7.27973 11.9439C6.98064 12.1195 6.75752 12.297 6.60614 12.4343C6.5304 12.5029 6.47243 12.5617 6.43168 12.6054C6.4113 12.6273 6.39519 12.6455 6.3833 12.6592L6.36861 12.6766L6.36361 12.6826L6.36169 12.685L6.36088 12.686L6.36016 12.6869C6.36016 12.6869 6.36016 12.6869 6.74998 13L6.36016 12.6869C6.18723 12.9022 6.22158 13.2169 6.43687 13.3898C6.65118 13.5619 6.96401 13.5287 7.13743 13.316L7.14031 13.3126C7.14422 13.3081 7.15188 13.2994 7.16335 13.2871C7.18628 13.2625 7.22431 13.2236 7.27783 13.1751C7.38494 13.078 7.55332 12.9429 7.78622 12.8061C8.24918 12.5342 8.97555 12.25 10.0019 12.25C11.0282 12.25 11.7535 12.5341 12.2153 12.8059C12.4477 12.9426 12.6155 13.0776 12.7222 13.1746C12.7755 13.2231 12.8134 13.2619 12.8362 13.2865C12.8476 13.2988 12.8552 13.3075 12.8591 13.312L12.862 13.3153C13.035 13.5283 13.3477 13.5621 13.5624 13.3904Z"
      />
    </svg>
  ),
  displayName: 'EmojiSadIcon',
});
