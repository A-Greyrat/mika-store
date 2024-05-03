import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [{
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        }
    ],
    plugins: [
        typescript(),
        resolve(),
        commonjs(),
        babel({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            babelHelpers: 'bundled',
        }),
    ],
    external: ['react', 'react-dom'],
}, {
    input: './src/index.d.ts',
    output: {file: 'dist/index.d.ts', format: 'es'},
    plugins: [dts()],
    external: [/\.css$/],
},];
