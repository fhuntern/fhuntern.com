(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("9fHv");
module.exports = __webpack_require__("eYY/");


/***/ }),

/***/ "9fHv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _questions_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("u8Nj");
var _questions_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t("u8Nj", 1);

var seenQuestions = [];
var audioVersionString = Date.now();
window.addEventListener('DOMContentLoaded', function () {
  next();
  document.querySelector('.next').addEventListener('click', function (e) {
    e.preventDefault();
    next();
  });
  document.querySelector('.show-answer').addEventListener('click', function (e) {
    e.preventDefault();
    showAnswer();
  });
  document.querySelector('#speak-questions').addEventListener('input', function (e) {
    if (!e.target.checked) {
      document.querySelector('#display-questions').checked = true;
      document.querySelector('.say-again').classList.add('hidden');
    } else {
      document.querySelector('.say-again').classList.remove('hidden');
    }
  });
  document.querySelector('#display-questions').addEventListener('input', function (e) {
    if (!e.target.checked) {
      document.querySelector('#speak-questions').checked = true;
    }
  });
  document.querySelector('.say-again').addEventListener('click', function (e) {
    e.preventDefault();
    playAudio(true);
  });
});

var getRandomIndex = function getRandomIndex() {
  if (seenQuestions.length >= 100) {
    alert("Test Completed");
    seenQuestions = [];
  }

  var rand = Math.floor(Math.random() * 100);

  if (seenQuestions.includes(rand)) {
    return getRandomIndex();
  }

  seenQuestions.push(rand);
  return rand;
};

var next = function next() {
  var randomIndex = getRandomIndex();
  document.querySelector("#remaining-count span").textContent = "".concat(100 - seenQuestions.length);
  addQuestionToDom(_questions_json__WEBPACK_IMPORTED_MODULE_0__[randomIndex], "".concat(randomIndex + 1, ". "));
};

var addQuestionToDom = function addQuestionToDom(questionObj, numberingText) {
  var li = document.querySelector('.question-wrapper li');
  li.textContent = '';
  var shouldSpeakQuestions = document.querySelector('#speak-questions').checked;
  var shouldDisplayQuestions = document.querySelector('#display-questions').checked;

  if (shouldSpeakQuestions) {
    sayTheQuestion(questionObj, li, numberingText);
  }

  if (shouldDisplayQuestions) {
    showTheQuestion(questionObj, li, numberingText);
  }

  displayTheAnswer(questionObj, li);
};

var displayTheAnswer = function displayTheAnswer(questionObj, parentNode) {
  var answerNode = document.createElement('div');
  answerNode.className = 'answer';
  questionObj.answers.forEach(function (answer) {
    var p = document.createElement('p');
    p.textContent = answer;
    answerNode.appendChild(p);
  });
  parentNode.appendChild(answerNode);
};

var showTheQuestion = function showTheQuestion(questionObj, parentNode, numberingText) {
  var questionNode = document.createElement('div');
  questionNode.className = 'question';
  var span1 = document.createElement('span');
  span1.textContent = numberingText;
  var span2 = document.createElement('span');
  span2.className = 'question-span';
  span2.textContent = questionObj.question;
  questionNode.appendChild(span1);
  questionNode.appendChild(span2);
  parentNode.appendChild(questionNode);
};

var sayTheQuestion = function sayTheQuestion(questionObj, parentNode, numberingText) {
  var options = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: questionObj.question
  };
  fetch('http://localhost:3000', options).then(function (res) {
    return res.json();
  }).then(function (data) {
    if (data.type && data.type === 'success') {
      playAudio()["catch"](function (err) {
        console.log('Speech server error: ', err);
        speechServerError(questionObj, parentNode, numberingText);
      });
    }
  })["catch"](function (err) {
    console.log('Speech server error: ', err);
    speechServerError(questionObj, parentNode, numberingText);
  });
};

var speechServerError = function speechServerError(questionObj, parentNode, numberingText) {
  document.querySelector('#speak-questions').checked = false;

  if (!document.querySelector('#display-questions').checked) {
    showTheQuestion(questionObj, parentNode, numberingText);
    document.querySelector('#display-questions').checked = true;
  }
};

var playAudio = function playAudio() {
  var playCached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return new Promise(function (resolve, reject) {
    var audioSrc = '../output.mp3';

    if (!playCached) {
      audioVersionString = Date.now();
    }

    audioSrc = "".concat(audioSrc, "?v=").concat(audioVersionString);
    var audio = new Audio(audioSrc);
    audio.play().then(function () {
      return resolve();
    })["catch"](function (err) {
      return reject("Unable to play audio: ".concat(err));
    });
  });
};

var showAnswer = function showAnswer() {
  document.querySelector('.question-wrapper .answer').classList.add('visible');
};

/***/ }),

/***/ "LboF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "eYY/":
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__("LboF");
            var content = __webpack_require__("nFVv");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "nFVv":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "u8Nj":
/***/ (function(module) {

module.exports = JSON.parse("[{\"question\":\"What is the supreme law of the land?\",\"answers\":[\"The Constitution\"]},{\"question\":\"What does the Constitution do?\",\"answers\":[\"sets up the government \",\"defines the government \",\"protects basic rights of Americans \"]},{\"question\":\"The idea of self-government is in the first three words of the Constitution. What are these words? \",\"answers\":[\"We the People\"]},{\"question\":\"What is an amendment?\",\"answers\":[\"a change (to the Constitution) \",\"an addition (to the Constitution) \"]},{\"question\":\"What do we call the first ten amendments to the Constitution?\",\"answers\":[\"the Bill of Rights\"]},{\"question\":\"What is one right or freedom from the First Amendment?\",\"answers\":[\"speech \",\"religion \",\"assembly \",\"press \",\"petition the government \"]},{\"question\":\"How many amendments does the Constitution have?\",\"answers\":[\"twenty-seven (27)\"]},{\"question\":\"What did the Declaration of Independence do?\",\"answers\":[\"announced our independence (from Great Britain) \",\"declared our independence (from Great Britain) \",\"said that the United States is free (from Great Britain) \"]},{\"question\":\"What are two rights in the Declaration of Independence?\",\"answers\":[\"life \",\"liberty \",\"pursuit of happiness \"]},{\"question\":\"What is freedom of religion?\",\"answers\":[\"You can practice any religion, or not practice a religion.\"]},{\"question\":\"What is the economic system in the United States?\",\"answers\":[\"capitalist economy \",\"market economy \"]},{\"question\":\"What is the rule of law?\",\"answers\":[\"Everyone must follow the law. \",\"Leaders must obey the law. \",\"Government must obey the law. \",\"No one is above the law. \"]},{\"question\":\"Name one branch or part of the government. \",\"answers\":[\"Congress \",\"legislative \",\"President \",\"executive \",\"the courts \",\"judicial \"]},{\"question\":\"What stops one branch of government from becoming too powerful?\",\"answers\":[\"checks and balances \",\"separation of powers \"]},{\"question\":\"Who is in charge of the executive branch?\",\"answers\":[\"the President\"]},{\"question\":\"Who makes federal laws?\",\"answers\":[\"Congress \",\"Senate and House (of Representatives) \",\"(U.S. or national) legislature \"]},{\"question\":\"What are the two parts of the U.S. Congress?\",\"answers\":[\"the Senate and House (of Representatives)\"]},{\"question\":\"How many U.S. Senators are there?\",\"answers\":[\"one hundred (100)\"]},{\"question\":\"We elect a U.S. Senator for how many years?\",\"answers\":[\"six (6)\"]},{\"question\":\"Who is one of your state's U.S. Senators now?\",\"answers\":[\"Answers will vary. [District of Columbia residents and residents of U.S. territories should answer that D.C. (or the territory where the applicant lives) has no U.S. Senators.] \"]},{\"question\":\"The House of Representatives has how many voting members?\",\"answers\":[\"four hundred thirty-five (435)\"]},{\"question\":\"We elect a U.S. Representative for how many years?\",\"answers\":[\"two (2)\"]},{\"question\":\"Name your U.S. Representative.\",\"answers\":[\"Answers will vary. [Residents of territories with nonvoting Delegates or Resident Commissioners may provide the name of that Delegate or Commissioner. Also acceptable is any statement that the territory has no (voting) Representatives in Congress.] \"]},{\"question\":\"Who does a U.S. Senator represent?\",\"answers\":[\"all people of the state\"]},{\"question\":\"Why do some states have more Representatives than other states?\",\"answers\":[\"(because of) the state's population \",\"(because) they have more people \",\"(because) some states have more people \"]},{\"question\":\"We elect a President for how many years?\",\"answers\":[\"four (4)\"]},{\"question\":\"In what month do we vote for President?\",\"answers\":[\"November\"]},{\"question\":\"What is the name of the President of the United States now?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the name of the President of the United States. \"]},{\"question\":\"What is the name of the Vice President of the United States now?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the name of the Vice President of the United States. \"]},{\"question\":\"If the President can no longer serve, who becomes President?\",\"answers\":[\"the Vice President\"]},{\"question\":\"If both the President and the Vice President can no longer serve, who becomes President? \",\"answers\":[\"the Speaker of the House\"]},{\"question\":\"Who is the Commander in Chief of the military?\",\"answers\":[\"the President\"]},{\"question\":\"Who signs bills to become laws? \",\"answers\":[\"the President\"]},{\"question\":\"Who vetoes bills?\",\"answers\":[\"the President\"]},{\"question\":\"What does the President's Cabinet do? \",\"answers\":[\"advises the President\"]},{\"question\":\"What are two Cabinet-level positions? \",\"answers\":[\"Secretary of Agriculture \",\"Secretary of Commerce \",\"Secretary of Defense \",\"Secretary of Education \",\"Secretary of Energy \",\"Secretary of Health and Human Services \",\"Secretary of Homeland Security \",\"Secretary of Housing and Urban Development \",\"Secretary of the Interior \",\"Secretary of Labor \",\"Secretary of State \",\"Secretary of Transportation \",\"Secretary of the Treasury \",\"Secretary of Veterans Affairs \",\"Attorney General \",\"Vice President \"]},{\"question\":\"What does the judicial branch do?\",\"answers\":[\"reviews laws \",\"explains laws \",\"resolves disputes (disagreements) \",\"decides if a law goes against the Constitution \"]},{\"question\":\"What is the highest court in the United States?\",\"answers\":[\"the Supreme Court\"]},{\"question\":\"How many justices are on the Supreme Court?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the number of justices on the Supreme Court. \"]},{\"question\":\"Who is the Chief Justice of the United States now?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the name of the Chief Justice of the United States. \"]},{\"question\":\"Under our Constitution, some powers belong to the federal government. What is one power of the federal government? \",\"answers\":[\"to print money \",\"to declare war \",\"to create an army \",\"to make treaties \"]},{\"question\":\"Under our Constitution, some powers belong to the states. What is one power of the states? \",\"answers\":[\"provide schooling and education \",\"provide protection (police) \",\"provide safety (fire departments) \",\"give a driver's license \",\"approve zoning and land use \"]},{\"question\":\"Who is the Governor of your state now? \",\"answers\":[\"Answers will vary. [District of Columbia residents should answer that D.C. does not have a Governor.] \"]},{\"question\":\"What is the capital of your state?\",\"answers\":[\"Answers will vary. [District of Columbia residents should answer that D.C. is not a state and does not have a capital. Residents of U.S. territories should name the capital of the territory.] \"]},{\"question\":\"What are the two major political parties in the United States?\",\"answers\":[\"Democratic and Republican\"]},{\"question\":\"What is the political party of the President now?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the political party of the President.\"]},{\"question\":\"What is the name of the Speaker of the House of Representatives now?\",\"answers\":[\"Visit uscis.gov/citizenship/testupdates for the name of the Speaker of the House of Representatives. \"]},{\"question\":\"There are four amendments to the Constitution about who can vote. Describe one of them. \",\"answers\":[\"Citizens eighteen (18) and older (can vote). \",\"You don't have to pay (a poll tax) to vote. \",\"Any citizen can vote. (Women and men can vote.) \",\"A male citizen of any race (can vote). \"]},{\"question\":\"What is one responsibility that is only for United States citizens?\",\"answers\":[\"serve on a jury \",\"vote in a federal election \"]},{\"question\":\"Name one right only for United States citizens.\",\"answers\":[\"vote in a federal election \",\"run for federal office \"]},{\"question\":\"What are two rights of everyone living in the United States?\",\"answers\":[\"freedom of expression \",\"freedom of speech \",\"freedom of assembly \",\"freedom to petition the government \",\"freedom of religion \",\"the right to bear arms \"]},{\"question\":\"What do we show loyalty to when we say the Pledge of Allegiance?\",\"answers\":[\"the United States \",\"the flag \"]},{\"question\":\"What is one promise you make when you become a United States citizen?\",\"answers\":[\"give up loyalty to other countries \",\"defend the Constitution and laws of the United States \",\"obey the laws of the United States \",\"serve in the U.S. military (if needed) \",\"serve (do important work for) the nation (if needed) \",\"be loyal to the United States \"]},{\"question\":\"How old do citizens have to be to vote for President? \",\"answers\":[\"eighteen (18) and older\"]},{\"question\":\"What are two ways that Americans can participate in their democracy?\",\"answers\":[\"vote \",\"join a political party \",\"help with a campaign \",\"join a civic group \",\"join a community group \",\"give an elected official your opinion on an issue \",\"call Senators and Representatives \",\"publicly support or oppose an issue or policy \",\"run for office \",\"write to a newspaper \"]},{\"question\":\"When is the last day you can send in federal income tax forms?\",\"answers\":[\"April 15\"]},{\"question\":\"When must all men register for the Selective Service? \",\"answers\":[\"at age eighteen (18) \",\"between eighteen (18) and twenty-six (26) \"]},{\"question\":\"What is one reason colonists came to America? \",\"answers\":[\"freedom \",\"political liberty \",\"religious freedom \",\"economic opportunity \",\"practice their religion \",\"escape persecution \"]},{\"question\":\"Who lived in America before the Europeans arrived?\",\"answers\":[\"American Indians \",\"Native Americans \"]},{\"question\":\"What group of people was taken to America and sold as slaves?\",\"answers\":[\"Africans \",\"people from Africa \"]},{\"question\":\"Why did the colonists fight the British?\",\"answers\":[\"because of high taxes (taxation without representation) \",\"because the British army stayed in their houses (boarding, quartering) \",\"because they didn't have self-government \"]},{\"question\":\"Who wrote the Declaration of Independence? \",\"answers\":[\"(Thomas) Jefferson\"]},{\"question\":\"When was the Declaration of Independence adopted?\",\"answers\":[\"July 4, 1776\"]},{\"question\":\"There were 13 original states. Name three.\",\"answers\":[\"New Hampshire \",\"Massachusetts \",\"Rhode Island \",\"Connecticut \",\"New York \",\"New Jersey \",\"Pennsylvania \",\"Delaware \",\"Maryland \",\"Virginia \",\"North Carolina \",\"South Carolina \",\"Georgia \"]},{\"question\":\"What happened at the Constitutional Convention?\",\"answers\":[\"The Constitution was written. \",\"The Founding Fathers wrote the Constitution. \"]},{\"question\":\"When was the Constitution written?\",\"answers\":[\"1787\"]},{\"question\":\"The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers. \",\"answers\":[\"(James) Madison \",\"(Alexander) Hamilton \",\"(John) Jay \",\"Publius \"]},{\"question\":\"What is one thing Benjamin Franklin is famous for?\",\"answers\":[\"U.S. diplomat\",\"oldest member of the Constitutional Convention \",\"first Postmaster General of the United States \",\"writer of \\\"Poor Richard's Almanac\\\"\",\"started the first free libraries \"]},{\"question\":\"Who is the 'Father of Our Country'?\",\"answers\":[\"(George) Washington\"]},{\"question\":\"Who was the first President?\",\"answers\":[\"(George) Washington\"]},{\"question\":\"What territory did the United States buy from France in 1803? \",\"answers\":[\"the Louisiana Territory \",\"Louisiana \"]},{\"question\":\"Name one war fought by the United States in the 1800s.\",\"answers\":[\"War of 1812 \",\"Mexican-American War \",\"Civil War \",\"Spanish-American War \"]},{\"question\":\"Name the U.S. war between the North and the South.\",\"answers\":[\"the Civil War \",\"the War between the States \"]},{\"question\":\"Name one problem that led to the Civil War.\",\"answers\":[\"slavery \",\"economic reasons \",\"states' rights \"]},{\"question\":\"What was one important thing that Abraham Lincoln did?\",\"answers\":[\"freed the slaves (Emancipation Proclamation) \",\"saved (or preserved) the Union \",\"led the United States during the Civil War \"]},{\"question\":\"What did the Emancipation Proclamation do?\",\"answers\":[\"freed the slaves \",\"freed slaves in the Confederacy \",\"freed slaves in the Confederate states \",\"freed slaves in most Southern states \"]},{\"question\":\"What did Susan B. Anthony do?\",\"answers\":[\"fought for women's rights \",\"fought for civil rights \"]},{\"question\":\"Name one war fought by the United States in the 1900s. \",\"answers\":[\"World War I \",\"World War II \",\"Korean War \",\"Vietnam War \",\"(Persian) Gulf War \"]},{\"question\":\"Who was President during World War I?\",\"answers\":[\"(Woodrow) Wilson\"]},{\"question\":\"Who was President during the Great Depression and World War II?\",\"answers\":[\"(Franklin) Roosevelt\"]},{\"question\":\"Who did the United States fight in World War II? \",\"answers\":[\"Japan, Germany, and Italy\"]},{\"question\":\"Before he was President, Eisenhower was a general. What war was he in? \",\"answers\":[\"World War II\"]},{\"question\":\"During the Cold War, what was the main concern of the United States?\",\"answers\":[\"Communism\"]},{\"question\":\"What movement tried to end racial discrimination?\",\"answers\":[\"civil rights (movement)\"]},{\"question\":\"What did Martin Luther King, Jr. do?\",\"answers\":[\"fought for civil rights \",\"worked for equality for all Americans \"]},{\"question\":\"What major event happened on September 11, 2001, in the United States? \",\"answers\":[\"Terrorists attacked the United States.\"]},{\"question\":\"Name one American Indian tribe in the United States.\",\"answers\":[\"Cherokee \",\"Navajo \",\"Sioux \",\"Chippewa \",\"Choctaw \",\"Pueblo \",\"Apache \",\"Iroquois \",\"Creek \",\"Blackfeet \",\"Seminole \",\"Cheyenne \",\"Arawak \",\"Shawnee \",\"Mohegan \",\"Huron \",\"Oneida \",\"Lakota \",\"Crow \",\"Teton \",\"Hopi \",\"Inuit \"]},{\"question\":\"Name one of the two longest rivers in the United States. \",\"answers\":[\"Missouri (River) \",\"Mississippi (River) \"]},{\"question\":\"What ocean is on the West Coast of the United States?\",\"answers\":[\"Pacific (Ocean)\"]},{\"question\":\"What ocean is on the East Coast of the United States?\",\"answers\":[\"Atlantic (Ocean)\"]},{\"question\":\"Name one U.S. territory.\",\"answers\":[\"Puerto Rico \",\"U.S. Virgin Islands \",\"American Samoa \",\"Northern Mariana Islands \",\"Guam \"]},{\"question\":\"Name one state that borders Canada.\",\"answers\":[\"Maine \",\"New Hampshire \",\"Vermont \",\"New York \",\"Pennsylvania \",\"Ohio \",\"Michigan \",\"Minnesota \",\"North Dakota \",\"Montana \",\"Idaho \",\"Washington \",\"Alaska \"]},{\"question\":\"Name one state that borders Mexico.\",\"answers\":[\"California \",\"Arizona \",\"New Mexico \",\"Texas \"]},{\"question\":\"What is the capital of the United States?\",\"answers\":[\"Washington, D.C.\"]},{\"question\":\"Where is the Statue of Liberty?\",\"answers\":[\"New York (Harbor) \",\"Liberty Island [Also acceptable are New Jersey, near New York City, and on the Hudson (River).] \"]},{\"question\":\"Why does the flag have 13 stripes? \",\"answers\":[\"because there were 13 original colonies \",\"because the stripes represent the original colonies \"]},{\"question\":\"Why does the flag have 50 stars?\",\"answers\":[\"because there is one star for each state \",\"because each star represents a state \",\"because there are 50 states \"]},{\"question\":\"What is the name of the national anthem?\",\"answers\":[\"The Star-Spangled Banner\"]},{\"question\":\"When do we celebrate Independence Day? \",\"answers\":[\"July 4\"]},{\"question\":\"Name two national U.S. holidays.\",\"answers\":[\"New Year's Day \",\"Martin Luther King, Jr. Day \",\"Presidents' Day \",\"Memorial Day \",\"Independence Day \",\"Labor Day \",\"Columbus Day \",\"Veterans Day \",\"Thanksgiving \",\"Christmas \"]}]");

/***/ })

},[[0,1]]]);