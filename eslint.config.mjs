import js from "@eslint/js";
import importPlugin from 'eslint-plugin-import';
import pluginPromise from 'eslint-plugin-promise'
import globals from "globals";


export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
	{
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
	},
]
