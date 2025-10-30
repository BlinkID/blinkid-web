# Open Source Dependencies Report

This report lists all open source dependencies used in the BlinkID SDK packages.

## Summary

This report includes:
- **NPM Dependencies**: Production dependencies from all packages in the monorepo (123 packages)
- **C++ Dependencies**: Native dependencies for WebAssembly builds (33 unique packages across 3 build flavors)

## NPM Dependencies

| Package | Version | License | Author | Homepage |
|---------|---------|---------|---------|----------|
| @ark-ui/solid | 5.26.2 | MIT | N/A | [Link](https://ark-ui.com) |
| @csstools/normalize.css | 12.1.1 | CC0-1.0 | Jonathan Neal | [Link](https://github.com/csstools/normalize.css#readme) |
| @floating-ui/core | 1.7.3 | MIT | atomiks | [Link](https://floating-ui.com) |
| @floating-ui/dom | 1.7.4 | MIT | atomiks | [Link](https://floating-ui.com) |
| @floating-ui/utils | 0.2.10 | MIT | atomiks | [Link](https://floating-ui.com) |
| @internationalized/date | 3.10.0 | Apache-2.0 | N/A | [Link](https://github.com/adobe/react-spectrum/tree/main#readme) |
| @internationalized/number | 3.6.5 | Apache-2.0 | N/A | [Link](https://github.com/adobe/react-spectrum#readme) |
| @motionone/animation | 10.18.0 | MIT | Matt Perry | N/A |
| @motionone/dom | 10.18.0 | MIT | Matt Perry | N/A |
| @motionone/easing | 10.18.0 | MIT | Matt Perry | N/A |
| @motionone/generators | 10.18.0 | MIT | Matt Perry | N/A |
| @motionone/types | 10.17.1 | MIT | Matt Perry | N/A |
| @motionone/utils | 10.18.0 | MIT | Matt Perry | N/A |
| @solid-primitives/event-listener | 2.4.0 | MIT | David Di Biase | [Link](https://primitives.solidjs.community/package/event-listener) |
| @solid-primitives/keyed | 1.5.0 | MIT | Damian Tarnawski @thetarnav | [Link](https://primitives.solidjs.community/package/keyed) |
| @solid-primitives/props | 3.1.11 | MIT | Damian Tarnawski | [Link](https://primitives.solidjs.community/package/props) |
| @solid-primitives/refs | 1.0.8 | MIT | Damian Tarnawski @thetarnav | [Link](https://primitives.solidjs.community/package/refs) |
| @solid-primitives/resize-observer | 2.1.0 | MIT | Moshe Udimar | [Link](https://primitives.solidjs.community/package/resize-observer) |
| @solid-primitives/rootless | 1.5.0 | MIT | Damian Tarnawski @thetarnav | [Link](https://primitives.solidjs.community/package/rootless) |
| @solid-primitives/static-store | 0.1.0 | MIT | Damian Tarnawski | [Link](https://primitives.solidjs.community/package/static-store) |
| @solid-primitives/transition-group | 1.0.5 | MIT | Damian Tarnawski | [Link](https://primitives.solidjs.community/package/transition-group) |
| @solid-primitives/utils | 6.2.3 | MIT | Damian Tarnawski @thetarnav | [Link](https://github.com/solidjs-community/solid-primitives/tree/main/packages/utils#readme) |
| @swc/helpers | 0.5.3 | Apache-2.0 | 강동윤 | [Link](https://swc.rs) |
| @wessberg/connection-observer | 1.0.5 | MIT | N/A | [Link](https://github.com/wessberg/connection-observer#readme) |
| @zag-js/accordion | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/anatomy | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/angle-slider | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/aria-hidden | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/async-list | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/auto-resize | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/avatar | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/bottom-sheet | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/carousel | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/checkbox | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/clipboard | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/collapsible | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/collection | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/color-picker | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/color-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/combobox | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/core | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/date-picker | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/date-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/dialog | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/dismissable | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/dom-query | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/editable | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/file-upload | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/file-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/floating-panel | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/focus-trap | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/focus-visible | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/highlight-word | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/hover-card | 1.26.3 | MIT | Abraham Aremu | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/i18n-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/interact-outside | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/json-tree-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/listbox | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/live-region | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/menu | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/number-input | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/pagination | 1.26.3 | MIT | Abraham Aremu | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/password-input | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/pin-input | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/popover | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/popper | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/presence | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/progress | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/qr-code | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/radio-group | 1.26.3 | MIT | Abraham Aremu | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/rating-group | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/rect-utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/remove-scroll | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/scroll-area | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/scroll-snap | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/select | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/signature-pad | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/slider | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/solid | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/splitter | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/steps | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/store | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/switch | 1.26.3 | MIT | Abraham Aremu | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/tabs | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/tags-input | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/timer | 1.26.3 | MIT | Abraham Aremu | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/toast | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/toggle | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/toggle-group | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/tooltip | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/tour | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/tree-view | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/types | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| @zag-js/utils | 1.26.3 | MIT | Segun Adebayo | [Link](https://github.com/chakra-ui/zag#readme) |
| clsx | 2.1.1 | MIT | Luke Edwards | [Link](https://github.com/lukeed/clsx#readme) |
| comlink | 4.4.2 | Apache-2.0 | Surma | [Link](https://github.com/GoogleChromeLabs/comlink#readme) |
| common-tags | 1.8.2 | MIT | Declan de Wet | [Link](https://github.com/zspecza/common-tags) |
| csstype | 3.1.3 | MIT | Fredrik Nicol | [Link](https://github.com/frenic/csstype#readme) |
| hey-listen | 1.0.8 | MIT | Matt Perry | [Link](https://github.com/Popmotion/hey-listen#readme) |
| is-what | 5.0.2 | MIT | Luca Ban - Mesqueeb | [Link](https://github.com/mesqueeb/is-what#readme) |
| js-tokens | 4.0.0 | MIT | Simon Lydell | [Link](https://github.com/lydell/js-tokens#readme) |
| loose-envify | 1.4.0 | MIT | Andres Suarez | [Link](https://github.com/zertosh/loose-envify) |
| merge-anything | 6.0.3 | MIT | Luca Ban - Mesqueeb | [Link](https://github.com/mesqueeb/merge-anything#readme) |
| nanoid | 5.0.2 | MIT | Andrey Sitnik | [Link](https://github.com/ai/nanoid#readme) |
| perfect-freehand | 1.2.2 | MIT | Steve Ruiz | [Link](https://github.com/steveruizok/perfect-freehand#readme) |
| proxy-compare | 3.0.0 | MIT | Daishi Kato | [Link](https://github.com/dai-shi/proxy-compare#readme) |
| proxy-memoize | 3.0.1 | MIT | Daishi Kato | [Link](https://github.com/dai-shi/proxy-memoize#readme) |
| rad-event-listener | 0.2.4 | MIT | N/A | [Link](https://github.com/JLarky/rad-event-listener#readme) |
| react | 18.2.0 | MIT | N/A | [Link](https://reactjs.org/) |
| rvfc-polyfill | 1.0.7 | GPL-3.0 | ThaUnknown | [Link](https://github.com/ThaUnknown/rvfc-polyfill#readme) |
| seroval | 1.3.2 | MIT | Alexis Munsayac | [Link](https://github.com/lxsmnsyc/seroval/tree/main/packages/seroval) |
| seroval-plugins | 1.3.3 | MIT | Alexis Munsayac | [Link](https://github.com/lxsmnsyc/seroval/tree/main/packages/plugins) |
| solid-js | 1.9.9 | MIT | Ryan Carniato | [Link](https://solidjs.com) |
| solid-motionone | 1.0.3 | MIT | Damian Tarnawski | N/A |
| solid-zustand | 1.8.1 | MIT | N/A | [Link](https://github.com/wobsoriano/solid-zustand#readme) |
| ts-pattern | 5.6.2 | MIT | Gabriel Vergnaud | [Link](https://github.com/gvergnaud/ts-pattern#readme) |
| tslib | 2.6.2 | 0BSD | Microsoft Corp. | [Link](https://www.typescriptlang.org/) |
| type-fest | 4.35.0 | (MIT OR CC0-1.0) | Sindre Sorhus | [Link](https://github.com/sindresorhus/type-fest#readme) |
| uqr | 0.1.2 | MIT | Anthony Fu | [Link](https://github.com/unjs/uqr#readme) |
| use-sync-external-store | 1.2.2 | MIT | N/A | [Link](https://github.com/facebook/react#readme) |
| wasm-feature-detect | 1.8.0 | Apache-2.0 | Surma | [Link](https://github.com/GoogleChromeLabs/wasm-feature-detect#readme) |
| yy-fps | 2.0.1 | MIT | David Figatner | [Link](https://github.com/davidfig/fps#readme) |
| zustand | 4.5.5 | MIT | Paul Henschel | [Link](https://github.com/pmndrs/zustand) |

## C++ Dependencies

| Package | License | URL | Description |
|---------|---------|-----|-------------|
| abseil/20250512.0.1@microblink/main#120e2c1b766e76087248ee491d67cb52 | Apache-2.0 | [Link](https://github.com/microblink/abseil-cpp) | Abseil Common Libraries (C++) from Google |
| adv_obfuscator/20170904.1@microblink/main#aa4c2ce54111773ef9ce027667b68d71 | https://github.com/microblink/ADVobfuscator#copyright-and-license | [Link](https://github.com/microblink/ADVobfuscator) | Obfuscation library based on C++11/14 and metaprogramming |
| boost/1.84.1@microblink/main#bff79afef94bda2190fd38c952381df6 | Boost Software license | [Link](https://bitbucket.org/microblink/boost) | Free peer-reviewed portable C++ source libraries. |
| concurrent_queue/1.0.1@microblink/main#b452679c066c30530f176c59cd276208 | Dual licensed under Simplified BSD License and Boost Software License - Version 1.0 | [Link](https://github.com/microblink/concurrentqueue) | A fast multi-producer, multi-consumer lock-free concurrent queue for C++11 |
| config_ex/1.1.1@microblink/main#58895a244f6055c6017a95e43ef5ce63 | MIT | [Link](https://github.com/microblink/config_ex) | Additions to boost/config for additional compiler-specific codegen tweaking macros |
| cpuinfo/20250509.9@microblink/main#40de5b1b7859404e36455d2a5a670efb | BSD 2-Clause "Simplified" License | [Link](https://github.com/microblink/cpuinfo) | cpuinfo is a library to detect essential for performance optimization information about host CPU |
| eigen/3.4.2@microblink/main#406195518d246c1d387b54df8ade9052 | Mozilla Public License Version 2.0 | [Link](https://github.com/microblink/eigen-git-mirror) | Eigen is a C++ template library for linear algebra: vectors, matrices, and related algorithms. It is versatile, fast, elegant and works on many platforms (OS/Compilers). |
| err/1.0.2@microblink/main#c37bea8eb2a49b4f46fdd47f028d144d | Boost Software License | [Link](https://github.com/microblink/err) | err - yet another take on C++ error handling |
| functionoid/1.0.1@microblink/main#a63c389de8e94c11f18c62430bb3aa1f | Boost Software License, Version 1.0 | [Link](https://github.com/microblink/functionoid) | a complete C++17 rewrite of boost/std::function |
| gtest/1.14.9@microblink/main#92cbac29cb2870655027eb912cd72358 | BSD 3-Clause | [Link](https://bitbucket.org/microblink/core-google-test/src) | Google's C++ test framework |
| hash/2.0.3@microblink/main#bca5158cdd3532fd9a32d7539b66194f | zlib | [Link](https://github.com/microblink/hash-library) | Portable C++ Hashing Library |
| kiwaku/20230809.4@microblink/main#6e5eb5cb85661173d4d516738282e5db | BSL-1.0 | [Link](https://github.com/microblink/kiwaku) | C++20 and onward collection of high performance data containers and related tools |
| libjpeg_turbo/3.0.2.2@microblink/main#c5ae8c1d15ab8215718ea3df429e55e1 | BSD-3-Clause, Zlib | [Link](https://github.com/microblink/libjpeg-turbo) | SIMD-accelerated libjpeg-compatible JPEG codec library |
| libpng/1.6.48@microblink/main#a894c6d32b60eb517232069228102b95 | libpng-2.0 | [Link](https://github.com/microblink/libpng) | An Open, Extensible Image Format with Lossless Compression |
| micro_ecc/1.0.0@microblink/main#1c323460f6536c0b0f5baaed9de6bcf5 | BSD 2-Clause "Simplified" License | [Link](https://github.com/microblink/micro-ecc) | A small and fast ECDH and ECDSA implementation for 8-bit, 32-bit, and 64-bit processors. |
| mmap/1.0.2@microblink/main#49540e8a3d87662b601b9b433396582c | Boost Software License | [Link](https://github.com/microblink/mmap) | portable, lightweight, powerful, near-zero-overhead memory mapping and virtual memory management |
| nlohmann_json/3.10.4#2d3ba0c641692cca9fb4514e05154688 | MIT | [Link](https://github.com/conan-io/conan-center-index) | JSON for Modern C++ parser and generator. |
| opencv/4.10.1@microblink/main#2bc2be2ecc71966cde69f7dbdf85a312 | MIT | [Link](https://github.com/microblink/opencv) | Microblink's fork of OpenCV |
| pimpl/1.0.1@microblink/main#4857170a202027c0fd2f22d0c2c4c7a3 | BSD 2-Clause "Simplified" License | [Link](https://github.com/microblink/pimpl) | Proving pimpls do not require heap, exceptions or runtime polymorphism. |
| protobuf/4.25.2@microblink/main#732767a0c74df7e4d7955a035060b19d | BSD | [Link](https://github.com/microblink/protobuf) | Google's language-neutral, platform-neutral, extensible mechanism for serializing structured data |
| qoixx/0.1.7.3@microblink/main#7a99513f8b969271ba87111c1317f1f0 | MIT License | [Link](https://github.com/microblink/qoixx) | qoixx is a high performance MIT licensed single-header QOI implementation written in C++20. |
| range-v3/0.12.0#abb9932b80d96eaf8fc992debe3870ed | BSL-1.0 | [Link](https://github.com/conan-io/conan-center-index) | Experimental range library for C++11/14/17 |
| rapidjson/1.1.6@microblink/main#22545451e78c6dfb8c85f2e14b862674 | BSD | [Link](https://bitbucket.org/microblink/core-rapidjson) | A fast JSON parser/generator for C++ with both SAX/DOM style API |
| re2/20240702.0.0@microblink/main#97effdb903f6546348047925d9d1f365 | BSD-3-Clause | [Link](https://github.com/microblink/re2) | Fast, safe, thread-friendly regular expression library |
| std_fix/1.0.2@microblink/main#3002fa1150d5261ad74d2d167d48e653 | BSL-1.0 | [Link](https://github.com/microblink/std_fix) | Patches for deficient C++ runtime implementations |
| sweater/1.1.7@microblink/main#00226324984e8fb052dd8e703b48d28e | MIT | [Link](https://github.com/microblink/sweater) | Humble Outer Dispatch |
| tf_messages/1.0.1@microblink/main#96187cc0ac393ee835b807074bb3e884 | Apache License 2.0 | [Link](https://bitbucket.org/microblink/core-tensorflow/) | Computation using data flow graphs for scalable machine learning |
| tinyxml2/2.2.4@microblink/main#e75d39f68113ec40fde0b991ffa76a37 | Zlib | [Link](https://github.com/microblink/tinyxml2) | a simple, small, efficient, C++ XML parser |
| tqdm/1.0.0@microblink/main#9f84ad8bec3a73f9635d64c0f49aea96 | MIT | [Link](https://bitbucket.org/microblink/core-tqdm) | tqdm-like single header c++ pretty progress bar |
| utfcpp/4.0.6@microblink/main#ea11de5465f5305ad0fc5d691185d7a5 | Boost Software License 1.0 | [Link](https://github.com/microblink/utfcpp) | UTF-8 with C++ in a Portable Way |
| xnnpack/20230525.1.6@microblink/main#3e5e60789c103ebfec170c7898cdfe4d | BSD | [Link](https://github.com/microblink/XNNPACK) | XNNPACK library |
| zlib/1.3.2@microblink/main#52419110a760a9cb8cd7bd57b01de0b2 | Zlib | [Link](https://github.com/microblink/zlib) | A massively spiffy yet delicately unobtrusive compression library. |
| zxing-cpp/1.1.0@microblink/main#6650d1dcd9e84e7917697e701c82ad47 | Apache License 2.0 | [Link](https://github.com/microblink/zxing) | ZXing ("Zebra Crossing") barcode scanning library for Java, Android |
