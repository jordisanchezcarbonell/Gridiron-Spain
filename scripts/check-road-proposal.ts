import assert from "node:assert/strict";
import { roadProposal } from "../src/data/road/proposal";

assert.equal(roadProposal.contact.email, "jordigw@gmail.com");
assert.equal(roadProposal.deliverables.length, 3);
assert.match(roadProposal.status.es ?? "", /pendiente de acuerdo/i);
assert.match(roadProposal.support.en ?? "", /two game tickets/i);
assert.match(roadProposal.intro.en ?? "", /planning our first college football trip/i);
assert.match(roadProposal.deliverables[2].text.es ?? "", /crónica de la experiencia/i);
console.log("Road proposal check passed.");
