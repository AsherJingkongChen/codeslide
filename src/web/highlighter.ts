import { HLJSApi } from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import armasm from 'highlight.js/lib/languages/armasm';
import c from 'highlight.js/lib/languages/c';
import clojure from 'highlight.js/lib/languages/clojure';
import cmake from 'highlight.js/lib/languages/cmake';
import coffeescript from 'highlight.js/lib/languages/coffeescript';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import dart from 'highlight.js/lib/languages/dart';
import diff from 'highlight.js/lib/languages/diff';
import elixir from 'highlight.js/lib/languages/elixir';
import erlang from 'highlight.js/lib/languages/erlang';
import go from 'highlight.js/lib/languages/go';
import graphql from 'highlight.js/lib/languages/graphql';
import groovy from 'highlight.js/lib/languages/groovy';
import haskell from 'highlight.js/lib/languages/haskell';
import ini from 'highlight.js/lib/languages/ini';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import julia from 'highlight.js/lib/languages/julia';
import kotlin from 'highlight.js/lib/languages/kotlin';
import less from 'highlight.js/lib/languages/less';
import lisp from 'highlight.js/lib/languages/lisp';
import lua from 'highlight.js/lib/languages/lua';
import makefile from 'highlight.js/lib/languages/makefile';
import markdown from 'highlight.js/lib/languages/markdown';
import objectivec from 'highlight.js/lib/languages/objectivec';
import perl from 'highlight.js/lib/languages/perl';
import php from 'highlight.js/lib/languages/php';
import plaintext from 'highlight.js/lib/languages/plaintext';
import python from 'highlight.js/lib/languages/python';
import r from 'highlight.js/lib/languages/r';
import ruby from 'highlight.js/lib/languages/ruby';
import rust from 'highlight.js/lib/languages/rust';
import scala from 'highlight.js/lib/languages/scala';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import swift from 'highlight.js/lib/languages/swift';
import typescript from 'highlight.js/lib/languages/typescript';
import vbnet from 'highlight.js/lib/languages/vbnet';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';

export const highlighter: HLJSApi = (() => {
  hljs.registerLanguage('armasm', armasm);
  hljs.registerLanguage('c', c);
  hljs.registerLanguage('clojure', clojure);
  hljs.registerLanguage('cmake', cmake);
  hljs.registerLanguage('coffeescript', coffeescript);
  hljs.registerLanguage('cpp', cpp);
  hljs.registerLanguage('csharp', csharp);
  hljs.registerLanguage('css', css);
  hljs.registerLanguage('dart', dart);
  hljs.registerLanguage('diff', diff);
  hljs.registerLanguage('elixir', elixir);
  hljs.registerLanguage('erlang', erlang);
  hljs.registerLanguage('go', go);
  hljs.registerLanguage('graphql', graphql);
  hljs.registerLanguage('groovy', groovy);
  hljs.registerLanguage('haskell', haskell);
  hljs.registerLanguage('ini', ini);
  hljs.registerLanguage('java', java);
  hljs.registerLanguage('javascript', javascript);
  hljs.registerLanguage('json', json);
  hljs.registerLanguage('julia', julia);
  hljs.registerLanguage('kotlin', kotlin);
  hljs.registerLanguage('less', less);
  hljs.registerLanguage('lisp', lisp);
  hljs.registerLanguage('lua', lua);
  hljs.registerLanguage('makefile', makefile);
  hljs.registerLanguage('markdown', markdown);
  hljs.registerLanguage('objectivec', objectivec);
  hljs.registerLanguage('perl', perl);
  hljs.registerLanguage('php', php);
  hljs.registerLanguage('plaintext', plaintext);
  hljs.registerLanguage('python', python);
  hljs.registerLanguage('r', r);
  hljs.registerLanguage('ruby', ruby);
  hljs.registerLanguage('rust', rust);
  hljs.registerLanguage('scala', scala);
  hljs.registerLanguage('scss', scss);
  hljs.registerLanguage('shell', shell);
  hljs.registerLanguage('sql', sql);
  hljs.registerLanguage('swift', swift);
  hljs.registerLanguage('typescript', typescript);
  hljs.registerLanguage('vbnet', vbnet);
  hljs.registerLanguage('xml', xml);
  hljs.registerLanguage('yaml', yaml);
  return hljs;
})();

export default highlighter;
export { HLJSApi };