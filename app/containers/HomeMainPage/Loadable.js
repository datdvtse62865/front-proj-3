/**
 *
 * Asynchronously loads the component for HomeMainPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
