<template>
  <div class="defaultPage">
    <div class="container pt-90">
      <div class="page-header">
        <h1>
          Blockchain Wallet API <br><small>Simple API for Blockchain Wallet users to send and receive bitcoin payments.</small>
        </h1>
      </div>
      <p class="well">
        The Blockchain Wallet API provides a simple interface Merchants can use to programmatically interact with their wallet.
      </p>
      <h2>Installation</h2>
      <p>
        To use this API, you will need to run small local service which be responsible for managing your Blockchain Wallet. Your application interacts with this service locally via HTTP API calls. <b><a href="https://github.com/blockchain/service-my-wallet-v3">Click here for complete setup instructions on GitHub.</a></b>
      </p>
      <div class="page-header">
        <h3>
          Create Wallet API <small>Create blockchain wallets programmatically</small>
        </h3>
        <p>
          The create_wallet method can be used to create a new blockchain.info bitcoin wallet.
        </p>
        <p>
          <b>URL:</b> http://localhost:3000/api/v2/create<br>
          <b>Method:</b> POST or GET
        </p>
        <ul>
          <li><b>$password</b> The password for the new wallet. Must be at least 10 characters in length.</li>
          <li><b>$api_code</b> An API code with create wallets permission.</li>
          <li><b>$priv</b> <font color="grey">A private key to add to the wallet (Wallet import format preferred). (Optional)</font></li>
          <li><b>$label</b> <font color="grey">A label to set for the first address in the wallet. Alphanumeric only. (Optional)</font></li>
          <li><b>$email</b> <font color="grey">An email to associate with the new wallet i.e. the email address of the user you are creating this wallet on behalf of. (Optional)</font></li>
        </ul>
        <p>Please create an API code <a href="/zh-cn/api/api_create_code">here</a> including permissions to "Create Wallets".</p>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln">
    </span><span class="str">"guid"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"4b8cd8e9-9480-44cc-b7f2-527e98ee3287"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"address"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"12AaMuRnzw6vW6s2KPRAGeX53meTf8JbZS"</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"label"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Main address"</span><span class="pln">
</span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Making Outgoing Payments</h3>
        <p>
          Send bitcoin from your wallet to another bitcoin address. All transactions include a 0.0001 BTC miners fee.
        </p>
        <p>
          All bitcoin values are in Satoshi i.e. divide by 100000000 to get the amount in BTC. The Base URL for all requests: <b>https://blockchain.info/zh-cn/merchant/$guid/</b>. <b>$guid</b> should be replaced with your Blockchain Wallet identifier (found on the login page).
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/payment?password=$main_password&amp;second_password=$second_password&amp;to=$address&amp;amount=$amount&amp;from=$from&amp;fee=$fee</b>
        </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain Wallet password</li>
          <li><b>$second_password</b> Your second Blockchain Wallet password if double encryption is enabled.</li>
          <li><b>$to</b> Recipient Bitcoin Address.</li>
          <li><b>$amount</b> Amount to send in satoshi.</li>
          <li><b>$from</b> <font color="grey">Send from a specific Bitcoin Address (Optional)</font></li>
          <li><b>$fee</b> <font color="grey">Transaction fee value in satoshi (Must be greater than default fee) (Optional)</font></li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"message"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Response Message"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"tx_hash"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Transaction Hash"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"notice"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Additional Message"</span><span class="pln"> </span><span class="pun">}</span></pre>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"message"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Sent 0.1 BTC to 1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"tx_hash"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"notice"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Some funds are pending confirmation and cannot be spent yet (Value 0.001 BTC)"</span><span class="pln"> </span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Send Many Transactions</h3>
        <p>
          Send a transaction to multiple recipients in the same transaction.
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/sendmany?password=$main_password&amp;second_password=$second_password&amp;recipients=$recipients&amp;fee=$fee</b>
        </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain wallet password</li>
          <li><b>$second_password</b> Your second Blockchain Wallet password if double encryption is enabled.</li>
          <li><b>$recipients</b> Is a JSON Object using Bitcoin Addresses as keys and the amounts to send as values (See below).</li>
          <li><b>$from</b> <font color="grey">Send from a specific Bitcoin Address (Optional)</font></li>
          <li><b>$fee</b> <font color="grey">Transaction fee value in satoshi (Must be greater than default fee) (Optional)</font></li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln">
    </span><span class="str">"1JzSZFs2DQke2B3S4pBxaNaMzzVZaG4Cqh"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">100000000</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"12Cf6nCcRtKERh9cQm3Z29c9MWvQuFSxvT"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">1500000000</span><span class="pun">,</span><span class="pln">
    </span><span class="str">"1dice6YgEVBf88erBFra9BHf6ZMoyvG88"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">200000000</span><span class="pln">
</span><span class="pun">}</span></pre>
        <p>The above example would send 1 BTC to 1JzSZFs2DQke2B3S4pBxaNaMzzVZaG4Cqh, 15 BTC to 12Cf6nCcRtKERh9cQm3Z29c9MWvQuFSxvT and 2 BTC to 1dice6YgEVBf88erBFra9BHf6ZMoyvG88 in the same transaction.</p>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"message"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Response Message"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"tx_hash"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Transaction Hash"</span><span class="pln"> </span><span class="pun">}</span></pre>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"message"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"Sent To Multiple Recipients"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"tx_hash"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c"</span><span class="pln"> </span><span class="pun">}</span></pre>
      </div>
      <h4>PHP Example</h4>
      <pre class="prettyprint"><span class="pun">&lt;?</span><span class="pln">

$guid</span><span class="pun">=</span><span class="str">"GUID_HERE"</span><span class="pun">;</span><span class="pln">
$firstpassword</span><span class="pun">=</span><span class="str">"PASSWORD_HERE"</span><span class="pun">;</span><span class="pln">
$secondpassword</span><span class="pun">=</span><span class="str">"PASSWORD_HERE"</span><span class="pun">;</span><span class="pln">
$amounta </span><span class="pun">=</span><span class="pln"> </span><span class="str">"10000000"</span><span class="pun">;</span><span class="pln">
$amountb </span><span class="pun">=</span><span class="pln"> </span><span class="str">"400000"</span><span class="pun">;</span><span class="pln">
$addressa </span><span class="pun">=</span><span class="pln"> </span><span class="str">"1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq"</span><span class="pun">;</span><span class="pln">
$addressb </span><span class="pun">=</span><span class="pln"> </span><span class="str">"1ExD2je6UNxL5oSu6iPUhn9Ta7UrN8bjBy"</span><span class="pun">;</span><span class="pln">
$recipients </span><span class="pun">=</span><span class="pln"> urlencode</span><span class="pun">(</span><span class="str">'{
                  "'</span><span class="pun">.</span><span class="pln">$addressa</span><span class="pun">.</span><span class="str">'": '</span><span class="pun">.</span><span class="pln">$amounta</span><span class="pun">.</span><span class="str">',
                  "'</span><span class="pun">.</span><span class="pln">$addressb</span><span class="pun">.</span><span class="str">'": '</span><span class="pun">.</span><span class="pln">$amountb</span><span class="pun">.</span><span class="str">'
               }'</span><span class="pun">);</span><span class="pln">

$json_url </span><span class="pun">=</span><span class="pln"> </span><span class="str">"http://localhost:3000/merchant/$guid/sendmany?password=$firstpassword&amp;second_password=$secondpassword&amp;recipients=$recipients"</span><span class="pun">;</span><span class="pln">

$json_data </span><span class="pun">=</span><span class="pln"> file_get_contents</span><span class="pun">(</span><span class="pln">$json_url</span><span class="pun">);</span><span class="pln">

$json_feed </span><span class="pun">=</span><span class="pln"> json_decode</span><span class="pun">(</span><span class="pln">$json_data</span><span class="pun">);</span><span class="pln">

$message </span><span class="pun">=</span><span class="pln"> $json_feed</span><span class="pun">-&gt;</span><span class="pln">message</span><span class="pun">;</span><span class="pln">
$txid </span><span class="pun">=</span><span class="pln"> $json_feed</span><span class="pun">-&gt;</span><span class="pln">tx_hash</span><span class="pun">;</span><span class="pln">

</span><span class="pun">?&gt;</span></pre>
      <div class="page-header">
        <h3>Fetching the wallet balance</h3>
        <p>
          Fetch the balance of a wallet. This should be used as an estimate only and will include unconfirmed transactions and possibly double spends.
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/balance?password=$main_password</b>
        </p>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"balance"</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Wallet</span><span class="pln"> </span><span class="typ">Balance</span><span class="pln"> </span><span class="kwd">in</span><span class="pln"> </span><span class="typ">Satoshi</span><span class="pln"> </span><span class="pun">}</span></pre>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"balance"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">1000</span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Listing Addresses</h3>
        <p>
          List all active addresses in a wallet. Also includes a 0 confirmation balance which should be used as an estimate only and will include unconfirmed transactions and possibly double spends.
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/list?password=$main_password</b>
        </p>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln">
    </span><span class="str">"addresses"</span><span class="pun">:</span><span class="pln"> </span><span class="pun">[</span><span class="pln">
        </span><span class="pun">{</span><span class="pln">
            </span><span class="str">"balance"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">1400938800</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"address"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"1Q1AtvCyKhtveGm3187mgNRh5YcukUWjQC"</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"label"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"SMS Deposits"</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"total_received"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">5954572400</span><span class="pln">
        </span><span class="pun">},</span><span class="pln">
        </span><span class="pun">{</span><span class="pln">
            </span><span class="str">"balance"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">79434360</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"address"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq"</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"label"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"My Wallet"</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"total_received"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">453300048335</span><span class="pln">
        </span><span class="pun">},</span><span class="pln">
        </span><span class="pun">{</span><span class="pln">
            </span><span class="str">"balance"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">0</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"address"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"17p49XUC2fw4Fn53WjZqYAm4APKqhNPEkY"</span><span class="pun">,</span><span class="pln">
            </span><span class="str">"total_received"</span><span class="pun">:</span><span class="pln"> </span><span class="lit">0</span><span class="pln">
        </span><span class="pun">}</span><span class="pln">
    </span><span class="pun">]</span><span class="pln">
</span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Getting the balance of an address</h3>
        <p>
          Retrieve the balance of a bitcoin address. <small>Querying the balance of an address by label is depreciated.</small>
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/address_balance?password=$main_password&amp;address=$address</b>
        </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain wallet password</li>
          <li><b>$address</b> The bitcoin address to lookup</li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="str">"balance"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="typ">Balance</span><span class="pln"> </span><span class="kwd">in</span><span class="pln"> </span><span class="typ">Satoshi</span><span class="pln"> </span><span class="pun">,</span><span class="str">"address"</span><span class="pun">:</span><span class="pln"> </span><span class="str">"Bitcoin Address"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"total_received"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="typ">Total</span><span class="pln"> </span><span class="typ">Satoshi</span><span class="pln"> </span><span class="typ">Received</span><span class="pun">}</span></pre>
        <pre class="prettyprint"><span class="pun">{</span><span class="str">"balance"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="lit">50000000</span><span class="pun">,</span><span class="pln"> </span><span class="str">"address"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"19r7jAbPDtfTKQ9VJpvDzFFxCjUJFKesVZ"</span><span class="pun">,</span><span class="pln"> </span><span class="str">"total_received"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="lit">100000000</span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Generating a new address</h3>
        <p>
          <b>http://localhost:3000/merchant/$guid/new_address?password=$main_password&amp;second_password=$second_password&amp;label=$label</b>
        </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain wallet password</li>
          <li><b>$second_password</b> Your second Blockchain Wallet password if double encryption is enabled.</li>
          <li><b>$label</b> An optional label to attach to this address. It is recommended this is a human readable string e.g. "Order No : 1234". You May use this as a reference to check balance of an order (documented later)</li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"address"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"The Bitcoin Address Generated"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"label"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"The Address Label"</span><span class="pun">}</span></pre>
        <pre class="prettyprint"><span class="pun">{</span><span class="pln"> </span><span class="str">"address"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"18fyqiZzndTxdVo7g9ouRogB4uFj86JJiy"</span><span class="pln"> </span><span class="pun">,</span><span class="pln"> </span><span class="str">"label"</span><span class="pun">:</span><span class="pln">  </span><span class="str">"Order No : 1234"</span><span class="pln"> </span><span class="pun">}</span></pre>
      </div>
      <h2 class="page-header">Address Management</h2>
      <div class="page-header">
        <h3>Archiving an address</h3>
        <p>
          To improve wallet performance addresses which have not been used recently should be moved to an archived state. They will still be held in the wallet but will no longer be included in the "list" or "list-transactions" calls.
        </p>
        <p>
          For example if an invoice is generated for a user once that invoice is paid the address should be archived.
        </p>
        <p>
          Or if a unique bitcoin address is generated for each user, users who have not logged in recently (~30 days) their addresses should be archived.
        </p>
        <p>
          <b>http://localhost:3000/merchant/$guid/archive_address?password=$main_password&amp;second_password=$second_password&amp;address=$address</b>
        </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain wallet password</li>
          <li><b>$address</b> The bitcoin address to archive</li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="str">"archived"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"18fyqiZzndTxdVo7g9ouRogB4uFj86JJiy"</span><span class="pun">}</span></pre>
      </div>
      <div class="page-header">
        <h3>Unarchive an address</h3>
        <p>
          Unarchive an address. Will also restore consolidated addresses (see below).
        </p><p>
        <b>http://localhost:3000/merchant/$guid/unarchive_address?password=$main_password&amp;second_password=$second_password&amp;address=$address</b>
      </p>
        <ul>
          <li><b>$main_password</b> Your Main Blockchain wallet password</li>
          <li><b>$address</b> The bitcoin address to unarchive</li>
        </ul>
        <h6>Response: <small>200 OK, application/json</small></h6>
        <pre class="prettyprint"><span class="pun">{</span><span class="str">"active"</span><span class="pln"> </span><span class="pun">:</span><span class="pln"> </span><span class="str">"18fyqiZzndTxdVo7g9ouRogB4uFj86JJiy"</span><span class="pun">}</span></pre>
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .container {
    font-size: 14px;
    color: #5f5f5f;  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    -webkit-box-direction: normal;
    line-height: 1.428571429;
  }
  .container ul {
    padding-left: 40px;
    list-style-type: disc;
    margin-top: 0;
    margin-bottom: 10px;
  }
  .container p{
    margin: 0 0 10px;
  }
  /*.well {*/
    /*min-height: 20px;*/
    /*padding: 19px;*/
    /*margin-bottom: 20px;*/
    /*background-color: #f5f5f5;*/
    /*border: 1px solid #e3e3e3;*/
    /*border-radius: 4px;*/
    /*-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);*/
    /*box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);*/
  /*}*/
  .page-header{
    padding-bottom: 9px;
    margin: 40px 0 20px;
    border-bottom: 1px solid #eeeeee;
  }
  h2{
    font-size: 30px;
  }
  small {
    font-weight: normal;
    line-height: 1;
    color: #777777;
    font-size: 65%;
  }
  h5 small, h6 small {
    font-size: 12px;
  }
  pre{
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857;
    word-break: break-all;
    word-wrap: break-word;
    color: #333333;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: auto;
  }
  .str{
    color: #080;
  }
  .h4, .h4, h5, .h5, h6, .h6 {
    font-size: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  a{
    outline: 0;
    cursor: pointer;
    color: #10ADE4;
    text-decoration: none;
  }
  h1 {
    font-size: 36px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  h3, .h3 {
    font-size: 24px;
  }
  .kwd {
    color: #008;
  }
  .pln{
    color: #000;
  }
  .typ {
    color: #606;
  }
  .pun, .opn, .clo {
    color: #660;
  }
  .lit {
    color: #066;
  }
</style>
