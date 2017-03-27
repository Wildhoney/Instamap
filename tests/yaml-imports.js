import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

require.extensions['.yml'] = (module, filename) => {
    module.exports = safeLoad(readFileSync(filename, 'utf8'));
};
